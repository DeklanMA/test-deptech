'use client'

import Table from '@/components/Table'
import Link from 'next/link'
import { useCategories } from '@/hooks/useCategories'

export default function CategoriesPage() {
    const { categories, deleteCategory } = useCategories()

    const columns = ['id', 'name', 'description']

    return (
        <div>
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-bold">Kategori Produk</h1>
                <Link
                    href="/categories/create"
                    className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
                    + Create Kategori
                </Link>
            </div>

            {categories ? (
                <Table
                    columns={columns}
                    data={categories}
                    showActions={true}
                    basePath="/categories"
                    onDelete={deleteCategory}
                />
            ) : (
                <p>Loading...</p>
            )}
        </div>
    )
}
