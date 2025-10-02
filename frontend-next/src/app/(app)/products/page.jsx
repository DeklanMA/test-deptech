'use client'

import Table from '@/components/Table'
import Link from 'next/link'
import { useProducts } from '@/hooks/useProducts'

export default function ProductsPage() {
    const { products, deleteProduct } = useProducts()

    const columns = [
        'ID',
        'Nama Produk',
        'Deskripsi Produk',
        'Gambar Produk',
        'Kategori Produk',
        'Stok Produk',
    ]

    return (
        <div>
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-bold">Produk</h1>
                <Link
                    href="/products/create"
                    className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
                    + Create Produk
                </Link>
            </div>

            {products ? (
                <Table
                    columns={columns}
                    data={products.map(p => ({
                        id: p.id,
                        'Nama Produk': p.name,
                        'Deskripsi Produk': p.description,
                        'Gambar Produk': p.image,
                        'Kategori Produk': p.category?.name || '-',
                        'Stok Produk': p.stock,
                    }))}
                    showActions={true}
                    basePath="/products"
                    onDelete={deleteProduct}
                />
            ) : (
                <p>Loading...</p>
            )}
        </div>
    )
}
