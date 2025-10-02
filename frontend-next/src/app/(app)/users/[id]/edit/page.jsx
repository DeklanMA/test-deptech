'use client'

import { useState, useEffect } from 'react'
import { useRouter, useParams } from 'next/navigation'
import { useUsers } from '@/hooks/useUsers'
import axios from '@/lib/axios'

export default function UserEditPage() {
    const router = useRouter()
    const params = useParams()
    const { updateUser } = useUsers()

    const [form, setForm] = useState({
        first_name: '',
        last_name: '',
        email: '',
        password: '',
        birth_date: '',
        gender: '',
    })

    const [errors, setErrors] = useState({})

    useEffect(() => {
        if (params?.id) {
            axios
                .get(`/api/users/${params.id}`)
                .then(res => setForm(res.data))
                .catch(err => console.error('Error fetch user:', err))
        }
    }, [params?.id])

    const handleChange = e => {
        setForm({ ...form, [e.target.name]: e.target.value })
    }

    const handleSubmit = async e => {
        e.preventDefault()
        const success = await updateUser(params.id, { setErrors, ...form })
        if (success) {
            alert('User berhasil diperbarui!')
            router.push('/users')
        }
    }

    return (
        <div className="max-w-lg mx-auto mt-10 p-6 bg-white rounded shadow">
            <h1 className="text-2xl font-bold mb-6">Edit User #{params.id}</h1>

            <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                    <label className="block mb-2 text-sm font-medium text-gray-700">
                        First Name
                    </label>
                    <input
                        type="text"
                        name="first_name"
                        value={form.first_name || ''}
                        onChange={handleChange}
                        className="w-full p-2 border rounded"
                        required
                    />
                    {errors.first_name && (
                        <p className="text-red-500 text-sm">
                            {errors.first_name[0]}
                        </p>
                    )}
                </div>

                <div>
                    <label className="block mb-2 text-sm font-medium text-gray-700">
                        Last Name
                    </label>
                    <input
                        type="text"
                        name="last_name"
                        value={form.last_name || ''}
                        onChange={handleChange}
                        className="w-full p-2 border rounded"
                        required
                    />
                    {errors.last_name && (
                        <p className="text-red-500 text-sm">
                            {errors.last_name[0]}
                        </p>
                    )}
                </div>

                <div>
                    <label className="block mb-2 text-sm font-medium text-gray-700">
                        Email
                    </label>
                    <input
                        type="email"
                        name="email"
                        value={form.email || ''}
                        onChange={handleChange}
                        className="w-full p-2 border rounded"
                        required
                    />
                    {errors.email && (
                        <p className="text-red-500 text-sm">
                            {errors.email[0]}
                        </p>
                    )}
                </div>

                <div>
                    <label className="block mb-2 text-sm font-medium text-gray-700">
                        Password (leave blank if unchanged)
                    </label>
                    <input
                        type="password"
                        name="password"
                        value={form.password || ''}
                        onChange={handleChange}
                        className="w-full p-2 border rounded"
                    />
                    {errors.password && (
                        <p className="text-red-500 text-sm">
                            {errors.password[0]}
                        </p>
                    )}
                </div>

                <div>
                    <label className="block mb-2 text-sm font-medium text-gray-700">
                        Date of Birth
                    </label>
                    <input
                        type="date"
                        name="birth_date"
                        value={form.birth_date || ''}
                        onChange={handleChange}
                        className="w-full p-2 border rounded"
                    />
                    {errors.birth_date && (
                        <p className="text-red-500 text-sm">
                            {errors.birth_date[0]}
                        </p>
                    )}
                </div>

                <div>
                    <label className="block mb-2 text-sm font-medium text-gray-700">
                        Gender
                    </label>
                    <select
                        name="gender"
                        value={form.gender || ''}
                        onChange={handleChange}
                        className="w-full p-2 border rounded">
                        <option value="">Select gender</option>
                        <option value="male">Male</option>
                        <option value="female">Female</option>
                    </select>
                    {errors.gender && (
                        <p className="text-red-500 text-sm">
                            {errors.gender[0]}
                        </p>
                    )}
                </div>

                <div className="flex justify-end">
                    <button
                        type="submit"
                        className="px-5 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
                        Save Changes
                    </button>
                </div>
            </form>
        </div>
    )
}
