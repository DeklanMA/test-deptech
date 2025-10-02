'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useCategories } from '@/hooks/useCategories'

export default function CreateCategoryPage() {
    const router = useRouter()
    const { createCategory } = useCategories()

    const [formData, setFormData] = useState({
        name: '',
        description: '',
    })
    const [errors, setErrors] = useState({})

    const handleChange = e => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        })
    }

    const handleSubmit = async e => {
        e.preventDefault()
        await createCategory({ ...formData, setErrors })

        // Kalau sukses tanpa error, redirect ke list
        if (Object.keys(errors).length === 0) {
            router.push('/categories')
        }
    }

    return (
        <div className="max-w-lg mx-auto bg-white shadow-md rounded p-6">
            <h1 className="text-2xl font-bold mb-6">Create Kategori Produk</h1>

            <form onSubmit={handleSubmit}>
                {/* Nama Kategori */}
                <div className="mb-4">
                    <label
                        htmlFor="name"
                        className="block text-sm font-medium text-gray-700">
                        Nama Kategori
                    </label>
                    <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                    />
                    {errors.name && (
                        <p className="text-red-500 text-sm">{errors.name}</p>
                    )}
                </div>

                {/* Deskripsi */}
                <div className="mb-4">
                    <label
                        htmlFor="description"
                        className="block text-sm font-medium text-gray-700">
                        Deskripsi
                    </label>
                    <textarea
                        id="description"
                        name="description"
                        value={formData.description}
                        onChange={handleChange}
                        required
                        rows={4}
                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                    />
                    {errors.description && (
                        <p className="text-red-500 text-sm">
                            {errors.description}
                        </p>
                    )}
                </div>

                {/* Buttons */}
                <div className="flex justify-end gap-3">
                    <button
                        type="button"
                        onClick={() => router.push('/categories')}
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
