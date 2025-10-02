'use client'

import Table from '@/components/Table'
import Link from 'next/link'
import { useTransactions } from '@/hooks/useTransactions'

export default function TransactionsPage() {
    const { transactions } = useTransactions()

    const columns = ['ID', 'Jenis Transaksi', 'Tanggal', 'Total Produk']

    return (
        <div>
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-bold">Transaksi Produk</h1>
                <Link
                    href="/orders/create"
                    className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
                    + Create Transaksi
                </Link>
            </div>

            {transactions ? (
                <Table
                    columns={columns}
                    data={transactions.map(t => ({
                        id: t.id,
                        'Jenis Transaksi':
                            t.type === 'stock_in' ? 'Stock In' : 'Stock Out',
                        Tanggal: new Date(t.date).toLocaleDateString(),
                        'Total Produk': t.total_products,
                    }))}
                    showActions={false}
                    basePath="/orders"
                />
            ) : (
                <p>Loading...</p>
            )}
        </div>
    )
}
