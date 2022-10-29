import React, { useMemo, useState } from 'react';
import {
  useTable,
  useSortBy,
  useGlobalFilter,
  usePagination
} from 'react-table';
import MOCK_DATA from './MOCK_DATA.json';
import { COLUMNS } from './columns.tsx';
import { smartContractAPI } from '../../api/smartContract';
import { SmartContract } from '../../models/hyperledger/smartContract';

import './Table.css';

import { GlobalFilter } from './GlobalFilter.tsx';

export const CompleteTable = () => {
  const [visibility, setVisibility] = useState(true);
  const columns = useMemo(() => COLUMNS, []);
  const data = useMemo(() => MOCK_DATA, []);

  // API:
  // const displayData: SmartContract[] = smartContractAPI.getAllContracts();

  const defaultColumn = useMemo(() => {
    return {
      Filter: GlobalFilter
    };
  }, []);

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
        <table {...getTableProps()}>
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
                <th>Pending</th>
              </tr>
            ))}
          </thead>
          <tbody {...getTableBodyProps()}>
            {page.map((row) => {
              prepareRow(row);
              return (
                <>
                  <tr {...row.getRowProps()}>
                    {row.cells.map((cell) => {
                      return (
                        <td {...cell.getCellProps()}>{cell.render('Cell')}</td>
                      );
                    })}
                    <td>
                      <div
                        className={
                          'status-button-' + row.original.license_status
                        }
                      >
                        <button className="table-btn-accept">Accept</button>
                        <button className="table-btn-decline">Decline</button>
                      </div>
                    </td>
                  </tr>
                </>
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
              borderRadius: '5px',
              cursor: 'pointer'
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
              borderRadius: '5px',
              cursor: 'pointer'
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
              borderRadius: '5px',
              cursor: 'pointer'
            }}
          >
            {' >>'}
          </button>
          <select
            value={pageSize}
            onChange={(e) => setPageSize(Number(e.target.value))}
            style={{
              paddingLeft: '5px',
              width: 'fit-content',
              cursor: 'pointer'
            }}
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
