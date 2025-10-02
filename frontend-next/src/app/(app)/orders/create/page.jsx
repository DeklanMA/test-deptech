'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useTransactions } from '@/hooks/useTransactions'
import { useProducts } from '@/hooks/useProducts'

export default function CreateTransactionPage() {
    const router = useRouter()
    const { createTransaction } = useTransactions()
    const { products } = useProducts()
    const [, setErrors] = useState([])

    const [type, setType] = useState('stock_in')
    const [items, setItems] = useState([{ product_id: '', qty: 1 }])

    const handleItemChange = (index, field, value) => {
        const newItems = [...items]
        newItems[index][field] = value
        setItems(newItems)
    }

    const addItemRow = () => {
        setItems([...items, { product_id: '', qty: 1 }])
    }

    const handleSubmit = async e => {
        e.preventDefault()

        if (type === 'stock_out') {
            for (const item of items) {
                const product = products?.find(p => p.id == item.product_id)
                if (product && item.qty > product.stock) {
                    alert(
                        `Stok produk "${product.name}" tidak mencukupi! Tersedia: ${product.stock}, diminta: ${item.qty}`,
                    )
                    return
                }
            }
        }

        await createTransaction({
            setErrors,
            type,
            products: items,
        })

        router.push('/orders') // redirect ke list transaksi
    }

    return (
        <div className="max-w-2xl mx-auto bg-white shadow-md rounded p-6">
            <h1 className="text-2xl font-bold mb-6">Create Transaksi</h1>

            <form onSubmit={handleSubmit} className="space-y-6">
                {/* Jenis Transaksi */}
                <div>
                    <label className="block text-sm font-medium text-gray-700">
                        Jenis Transaksi
                    </label>
                    <select
                        value={type}
                        onChange={e => setType(e.target.value)}
                        className="mt-1 block w-full px-3 py-2 border rounded">
                        <option value="stock_in">Stock In</option>
                        <option value="stock_out">Stock Out</option>
                    </select>
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700">
                        Produk
                    </label>
                    {items.map((item, index) => (
                        <div key={index} className="flex gap-2 mb-2">
                            <select
                                value={item.product_id}
                                onChange={e =>
                                    handleItemChange(
                                        index,
                                        'product_id',
                                        e.target.value,
                                    )
                                }
                                className="w-2/3 px-2 py-1 border rounded"
                                required>
                                <option value="">-- Pilih Produk --</option>
                                {products?.map(p => (
                                    <option key={p.id} value={p.id}>
                                        {p.name} (stok: {p.stock})
                                    </option>
                                ))}
                            </select>
                            <input
                                type="number"
                                value={item.qty}
                                onChange={e =>
                                    handleItemChange(
                                        index,
                                        'qty',
                                        parseInt(e.target.value, 10),
                                    )
                                }
                                className="w-1/3 px-2 py-1 border rounded"
                                min={1}
                                required
                            />
                        </div>
                    ))}
                    <button
                        type="button"
                        onClick={addItemRow}
                        className="text-blue-600 hover:underline text-sm">
                        + Tambah Produk
                    </button>
                </div>

                <div className="flex justify-end gap-3">
                    <button
                        type="button"
                        onClick={() => router.push('/orders')}
                        className="px-4 py-2 bg-gray-300 text-gray-800 rounded hover:bg-gray-400">
                        Cancel
                    </button>
                    <button
                        type="submit"
                        className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
                        Save
                    </button>
                </div>
            </form>
        </div>
    )
}
