'use client'

import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { useProducts } from '@/hooks/useProducts'
import { useCategories } from '@/hooks/useCategories'
import Image from 'next/image'

export default function CreateProductPage() {
    const router = useRouter()
    const { createProduct } = useProducts()
    const { categories } = useCategories()

    const [form, setForm] = useState({
        name: '',
        description: '',
        image: null,
        category_id: '',
        stock: '',
    })

    const [errors, setErrors] = useState({})

    const handleChange = e => {
        const { name, value, files } = e.target
        if (name === 'image') {
            setForm({ ...form, image: files[0] })
        } else {
            setForm({ ...form, [name]: value })
        }
    }

    const handleSubmit = async e => {
        e.preventDefault()

        const formData = new FormData()
        formData.append('name', form.name)
        formData.append('description', form.description)
        formData.append('stock', form.stock)
        formData.append('category_id', form.category_id)
        if (form.image instanceof File) {
            formData.append('image', form.image)
        }

        const success = await createProduct({ setErrors, formData })
        if (success) router.push('/products')
    }

    return (
        <div className="max-w-2xl mx-auto bg-white shadow p-6 rounded-lg">
            <h1 className="text-2xl font-bold mb-6">Tambah Produk</h1>

            <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                    <label className="block text-sm font-medium">
                        Nama Produk
                    </label>
                    <input
                        type="text"
                        name="name"
                        value={form.name}
                        onChange={handleChange}
                        className="w-full border rounded px-3 py-2"
                        required
                    />
                    {errors.name && (
                        <p className="text-red-500 text-sm mt-1">
                            {errors.name[0]}
                        </p>
                    )}
                </div>

                <div>
                    <label className="block text-sm font-medium">
                        Deskripsi Produk
                    </label>
                    <textarea
                        name="description"
                        value={form.description}
                        onChange={handleChange}
                        className="w-full border rounded px-3 py-2"
                        required
                    />
                    {errors.description && (
                        <p className="text-red-500 text-sm mt-1">
                            {errors.description[0]}
                        </p>
                    )}
                </div>

                <div>
                    <label className="block text-sm font-medium">
                        Gambar Produk
                    </label>
                    <input
                        type="file"
                        name="image"
                        accept="image/*"
                        onChange={handleChange}
                        className="mt-2"
                        required
                    />
                    {errors.image && (
                        <p className="text-red-500 text-sm mt-1">
                            {errors.image[0]}
                        </p>
                    )}

                    {form.image instanceof File && (
                        <Image
                            src={URL.createObjectURL(form.image)}
                            alt="preview"
                            width={120}
                            height={120}
                            className="mt-4 rounded object-contain border"
                        />
                    )}
                </div>

                <div>
                    <label className="block text-sm font-medium">
                        Kategori Produk
                    </label>
                    <select
                        name="category_id"
                        value={form.category_id}
                        onChange={handleChange}
                        className="w-full border rounded px-3 py-2"
                        required>
                        <option value="">-- Pilih Kategori --</option>
                        {categories?.map(c => (
                            <option key={c.id} value={c.id}>
                                {c.name}
                            </option>
                        ))}
                    </select>
                    {errors.category_id && (
                        <p className="text-red-500 text-sm mt-1">
                            {errors.category_id[0]}
                        </p>
                    )}
                </div>

                <div>
                    <label className="block text-sm font-medium">
                        Stok Produk
                    </label>
                    <input
                        type="number"
                        name="stock"
                        value={form.stock}
                        onChange={handleChange}
                        className="w-full border rounded px-3 py-2"
                        required
                    />
                    {errors.stock && (
                        <p className="text-red-500 text-sm mt-1">
                            {errors.stock[0]}
                        </p>
                    )}
                </div>

                <div className="flex justify-end gap-2">
                    <button
                        type="button"
                        onClick={() => router.push('/products')}
                        className="px-4 py-2 bg-gray-300 text-gray-800 rounded hover:bg-gray-400">
                        Batal
                    </button>
                    <button
                        type="submit"
                        className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
                        Simpan
                    </button>
                </div>
            </form>
        </div>
    )
}
