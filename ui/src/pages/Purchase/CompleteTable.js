import React, { useMemo, useState, useEffect } from 'react';
import {
  useTable,
  useSortBy,
  useGlobalFilter,
  usePagination
} from 'react-table';
import MOCK_DATA from './MOCK_DATA.json';
import { proposalApi } from '../../api/proposalApi';
import { COLUMNS } from './columns.tsx';
import { Button, Popover } from 'antd';

import './Table.css';

import { GlobalFilter } from './GlobalFilter.tsx';
import { userApi } from '../../api/userApi';
import { appApi } from '../../api/appApi';
import moment from 'moment';
import { useGlobalContext } from '../../context/global/GlobalContext';
import { ratings } from '../../consts/ratings';

export const CompleteTable = () => {
  const { setIsLoading } = useGlobalContext();
  const columns = useMemo(() => COLUMNS, []);
  const [data, setData] = useState([]);
  const [currentFolderData, setCurrentFolderData] = useState();
  const [currentSellerData, setCurrentSellerData] = useState();

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setIsLoading(true);
    const currentUserResponse = await userApi.getCurrentUser();
    const buyerId = currentUserResponse.data._id;
    const response = await proposalApi.getProposalByBuyerId(
      encodeURIComponent(buyerId)
    );

    const proposalsData = response.data.map((item) => item.Record);
    console.log(proposalsData);
    setData(proposalsData);
    setIsLoading(false);
  };

  // API:
  // const displayData: SmartContract[] = smartContractAPI.getAllContracts();

  const defaultColumn = useMemo(() => {
    return {
      Filter: GlobalFilter
    };
  }, []);

  const renderPopoverContent = (cell) => {
    if (cell.column.id === 'appId') {
      return (
        <div>
          <div className="flex gap-2">
            <p className="font-semibold">AppId: </p>
            <p>{cell.value}</p>
          </div>
          <div className="flex gap-2">
            <p className="font-semibold">Title: </p>
            <p>{currentFolderData ? currentFolderData.title : 'Loading...'}</p>
          </div>
          <div className="flex gap-2">
            <p className="font-semibold">Type: </p>
            <p>
              {currentFolderData ? currentFolderData.appType : 'Loading...'}
            </p>
          </div>
          <div className="flex gap-2">
            <p className="font-semibold">Categories: </p>
            <p>
              {currentFolderData
                ? currentFolderData.appCategories.join(', ')
                : 'Loading...'}
            </p>
          </div>
          <div className="flex gap-2">
            <p className="font-semibold">Rating: </p>
            <p>
              {currentFolderData
                ? ratings[currentFolderData.rating]
                : 'Loading...'}
            </p>
          </div>
          <div className="flex gap-2">
            <p className="font-semibold">Tags: </p>
            <p>
              {currentFolderData
                ? currentFolderData.appTags.join(', ')
                : 'Loading...'}
            </p>
          </div>
        </div>
      );
    }
    if (cell.column.id === 'sellerId') {
      return (
        <div className="max-w-[300px]">
          <div className="flex gap-2">
            <p className="font-semibold">SellerId: </p>
            <p className="w-3/4 break-words">{cell.value}</p>
          </div>
          <div className="flex gap-2">
            <p className="font-semibold">Full Name: </p>
            <p>
              {currentSellerData ? currentSellerData.fullname : 'Loading...'}
            </p>
          </div>
          <div className="flex gap-2">
            <p className="font-semibold">Email: </p>
            <p>{currentSellerData ? currentSellerData.email : 'Loading...'}</p>
          </div>
          <div className="flex gap-2">
            <p className="font-semibold">Birthdate: </p>
            <p>
              {currentSellerData
                ? moment(currentSellerData.dob).format('DD/MM/YYYY')
                : 'Loading...'}
            </p>
          </div>
        </div>
      );
    }
    return (
      <div className="max-w-[300px] break-words">
        <p>{cell.value}</p>
      </div>
    );
  };

  const handleHover = async (row) => {
    const appRes = await appApi.getAppById(row.values.appId);
    setCurrentFolderData(appRes.Record);
    const userRes = await userApi.getInfoById(row.values.sellerId);
    setCurrentSellerData(userRes);
  };

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
    state,
    setGlobalFilter,
    page,
    nextPage,
    previousPage,
    pageOptions,
    gotoPage,
    pageCount,
    canNextPage,
    canPreviousPage,
    setPageSize
  } = useTable(
    {
      columns,
      data,
      defaultColumn,
      initialState: { pageIndex: 0, pageSize: 5 }
    },
    useGlobalFilter,
    useSortBy,
    usePagination
  );

  const { globalFilter, pageIndex, pageSize } = state;

  return (
    <>
      <div className="table-container">
        <GlobalFilter filter={globalFilter} setFilter={setGlobalFilter} />
        <table {...getTableProps()} style={{ tableLayout: 'fixed' }}>
          <thead>
            {headerGroups.map((headerGroup) => (
              <tr {...headerGroup.getHeaderGroupProps()}>
                {headerGroup.headers.map((column) => (
                  <th {...column.getHeaderProps(column.getSortByToggleProps())}>
                    {column.render('Header')}
                    <span>
                      {column.isSorted
                        ? column.isSortedDesc
                          ? ' 🔽'
                          : ' 🔼'
                        : ''}
                    </span>
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody {...getTableBodyProps()}>
            {page.map((row) => {
              prepareRow(row);
              return (
                <tr {...row.getRowProps()} onMouseOver={() => handleHover(row)}>
                  {row.cells.map((cell) => {
                    return (
                      <td {...cell.getCellProps()}>
                        <Popover
                          content={() => renderPopoverContent(cell)}
                          arrowPointAtCenter
                        >
                          <Button
                            className="w-full text-ellipsis overflow-hidden"
                            type="text"
                          >
                            {cell.render('Cell')}
                          </Button>
                        </Popover>
                      </td>
                    );
                  })}
                </tr>
              );
            })}
          </tbody>
        </table>
        <div className="table-footer" style={{ zIndex: '999' }}>
          <span>
            Page{' '}
            <strong>
              {pageIndex + 1} of {pageOptions.length}
            </strong>
          </span>
          <span>
            | Go to Page:{' '}
            <input
              type="number"
              defaultValue={pageIndex + 1}
              onChange={(e) => {
                const pageNumber = e.target.value
                  ? Number(e.target.value) - 1
                  : 0;
                gotoPage(pageNumber);
              }}
              style={{ width: '40px', height: '35px' }}
            />
          </span>
          <button
            onClick={() => gotoPage(0)}
            disabled={!canPreviousPage}
            style={{
              marginLeft: '7px',
              padding: '7px',
              backgroundColor: '#FB7F4B',
              color: 'white',
              borderRadius: '5px'
            }}
          >
            {'<< '}
          </button>
          <button
            onClick={() => previousPage()}
            disabled={!canPreviousPage}
            style={{
              marginLeft: '5px',
              padding: '7px',
              backgroundColor: '#FB7F4B',
              color: 'white',
              borderRadius: '5px'
            }}
          >
            {' '}
            Previous
          </button>

          <button
            onClick={() => nextPage()}
            disabled={!canNextPage}
            style={{
              marginLeft: '5px',
              padding: '7px',
              backgroundColor: '#FB7F4B',
              color: 'white',
              borderRadius: '5px'
            }}
          >
            {' '}
            Next
          </button>
          <button
            onClick={() => gotoPage(pageCount - 1)}
            disabled={!canNextPage}
            style={{
              marginLeft: '5px',
              marginRight: '5px',
              padding: '7px',
              backgroundColor: '#FB7F4B',
              color: 'white',
              borderRadius: '5px'
            }}
          >
            {' >>'}
          </button>
          <select
            value={pageSize}
            onChange={(e) => setPageSize(Number(e.target.value))}
            style={{ paddingLeft: '5px', width: 'fit-content' }}
          >
            {[5, 10, 20].map((pageSize) => (
              <option key={pageSize} value={pageSize}>
                Show {pageSize}
              </option>
            ))}
          </select>
        </div>
      </div>
    </>
  );
};

export default CompleteTable;
