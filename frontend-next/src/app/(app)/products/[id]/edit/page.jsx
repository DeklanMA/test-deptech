'use client'

import { useParams, useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { useProducts } from '@/hooks/useProducts'
import { useCategories } from '@/hooks/useCategories'
import Image from 'next/image'

export default function EditProductPage() {
    const { id } = useParams()
    const router = useRouter()
    const { updateProduct, products } = useProducts()
    const { categories } = useCategories()

    const [form, setForm] = useState({
        name: '',
        description: '',
        image: null,
        category_id: '',
        stock: '',
    })

    const [, setErrors] = useState([])

    useEffect(() => {
        if (products) {
            const product = products.find(p => p.id == id)
            if (product) {
                setForm({
                    name: product.name,
                    description: product.description,
                    image: product.image, // simpan path string
                    category_id: product.category_id,
                    stock: product.stock,
                })
            }
        }
    }, [products, id])

    const handleChange = e => {
        const { name, value, files } = e.target
        if (name === 'image') {
            setForm({ ...form, image: files[0] }) // kalau upload baru
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

        try {
            await updateProduct(id, formData)
            router.push('/products')
        } catch (err) {
            setErrors(err)
        }
    }

    return (
        <div className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow">
            <h1 className="text-2xl font-bold mb-6">Edit Produk #{id}</h1>

            <form onSubmit={handleSubmit} className="space-y-6">
                {/* Nama Produk */}
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
                </div>

                {/* Deskripsi */}
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
                </div>

                {/* Upload + Preview */}
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
                    />
                    {form.image && !(form.image instanceof File) && (
                        <Image
                            src={
                                form.image.startsWith('/storage')
                                    ? form.image
                                    : `/storage/${form.image}`
                            }
                            alt="preview"
                            width={120}
                            height={120}
                            className="mt-4 rounded object-contain"
                        />
                    )}
                    {form.image instanceof File && (
                        <p className="mt-2 text-sm text-gray-600">
                            {form.image.name}
                        </p>
                    )}
                </div>

                {/* Kategori */}
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
                </div>

                {/* Stok */}
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
                </div>

                {/* Tombol */}
                <div className="flex gap-3">
                    <button
                        type="submit"
                        className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
                        Update
                    </button>
                    <button
                        type="button"
                        onClick={() => router.push('/products')}
                        className="px-4 py-2 bg-gray-300 text-gray-800 rounded-lg hover:bg-gray-400">
                        Cancel
                    </button>
                </div>
            </form>
        </div>
    )
}
