import React, {useMemo} from 'react'
import { useTable, useColumnOrder } from 'react-table'
import  MOCK_DATA from './MOCK_DATA.json'
import { COLUMNS } from './columns.js'
import './Table.css'

export const ColumnOrder = () => {
    const columns = useMemo(() => COLUMNS, [])
    const data = useMemo(() => MOCK_DATA, [])

    const { 
        getTableProps, 
        getTableBodyProps, 
        headerGroups, 
        footerGroups,
        rows, 
        prepareRow, 
        setColumnOrder, 
    } = useTable({
        columns,
        data,
    }, useColumnOrder)

    const changeOrder = () => {
        setColumnOrder([
            'id', 
            'product_name', 
            'in_stock', 
            'expiry_date',  
            'price',
            'status'
        ])
    }

    return (
        <>
        <button onClick={changeOrder}>Change Column Order</button>
        <table {...getTableProps()}>
            <thead>
                {headerGroups.map((headerGroup) => (
                <tr {...headerGroup.getHeaderGroupProps()}>
                    {
                        headerGroup.headers.map(column => (
                            <th {...column.getHeaderProps()}>{column.render('Header')}</th>
                        ))}
                </tr>
                ))}
            </thead>
            <tbody {...getTableBodyProps()}>
                {rows.map((row) => {
                    prepareRow(row)
                    return (
                        <tr {...row.getRowProps()}>
                            {row.cells.map((cell) => {
                                return <td {...cell.getCellProps()}>{cell.render('Cell')}</td>
                            })}
                        </tr>
                    )
                })} 
            </tbody>

            <tfoot>
                {footerGroups.map((footerGroup) => (
                    <tr {...footerGroup.getFooterGroupProps()}>
                        {footerGroup.headers.map((column) => (
                                <td {...column.getFooterProps}>
                                    {
                                        column.render('Footer')
                                    }
                                </td>
                        ))}
                    </tr>
                ))}
            </tfoot>
        </table>
        </>
    )
}


export default ColumnOrder;