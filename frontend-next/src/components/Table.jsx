'use client'

import Image from 'next/image'
import ActionMenu from './ActionMenu'

const Table = ({
    columns,
    data,
    showActions = false,
    basePath = '',
    onDelete,
}) => {
    return (
        <div className="relative overflow-y-visible shadow-md sm:rounded-lg">
            <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                    <tr>
                        {columns.map((col, idx) => (
                            <th
                                key={idx}
                                scope="col"
                                className="px-6 py-3 text-center">
                                {col}
                            </th>
                        ))}
                        {showActions && (
                            <th scope="col" className="px-6 py-3 text-center">
                                Actions
                            </th>
                        )}
                    </tr>
                </thead>
                <tbody>
                    {data.map((row, rowIdx) => (
                        <tr
                            key={rowIdx}
                            className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                            {columns.map((col, colIdx) => {
                                // ambil data langsung, fallback ke lowercase
                                const value = row[col] ?? row[col.toLowerCase()]

                                return (
                                    <td
                                        key={colIdx}
                                        className="px-6 py-4 text-center">
                                        {col === 'Gambar Produk' && value ? (
                                            <Image
                                                src={
                                                    value.startsWith('/storage')
                                                        ? value
                                                        : `/storage/${value}`
                                                }
                                                alt="Product"
                                                width={100}
                                                height={100}
                                                className="h-12 mx-auto object-contain rounded "
                                            />
                                        ) : (
                                            value
                                        )}
                                    </td>
                                )
                            })}

                            {showActions && (
                                <td className="px-6 py-4 text-center">
                                    <ActionMenu
                                        editHref={`${basePath}/${row.id}/edit`}
                                        onDelete={() => onDelete(row.id)}
                                    />
                                </td>
                            )}
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}

export default Table
