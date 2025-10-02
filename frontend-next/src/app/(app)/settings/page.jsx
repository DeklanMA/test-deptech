'use client'

import { useAuth } from '@/hooks/auth'
import { useUsers } from '@/hooks/useUsers'
import { useState, useEffect } from 'react'

export default function SettingsPage() {
    const { user, logout } = useAuth({ middleware: 'auth' })
    const { updateUser } = useUsers()

    const [form, setForm] = useState({
        first_name: '',
        last_name: '',
        email: '',
        password: '',
        password_confirmation: '',
    })

    const [errors, setErrors] = useState({})
    const [successMessage, setSuccessMessage] = useState('')

    useEffect(() => {
        if (user) {
            setForm({
                first_name: user.first_name || '',
                last_name: user.last_name || '',
                email: user.email || '',
                password: '',
                password_confirmation: '',
            })
        }
    }, [user])

    const handleChange = e => {
        setForm({ ...form, [e.target.name]: e.target.value })
    }

    const handleSubmit = async e => {
        e.preventDefault()
        if (!user) return

        setErrors({})
        try {
            const success = await updateUser(user.id, { setErrors, ...form })
            if (success) {
                setSuccessMessage('Profil berhasil diperbarui')
                setTimeout(() => setSuccessMessage(''), 3000)
            }
        } catch (err) {
            console.error(err)
        }
    }

    if (!user) return <p>Loading...</p>

    return (
        <div className="max-w-2xl mx-auto bg-white p-6 rounded-lg shadow">
            <h1 className="text-2xl font-bold mb-6">Pengaturan Akun</h1>

            {successMessage && (
                <div className="mb-4 p-3 text-green-700 bg-green-100 border border-green-300 rounded">
                    {successMessage}
                </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label className="block text-sm font-medium text-gray-700">
                        Nama Depan
                    </label>
                    <input
                        type="text"
                        name="first_name"
                        value={form.first_name}
                        onChange={handleChange}
                        className="w-full p-2 border rounded"
                        required
                    />
                    {errors.first_name && (
                        <p className="text-red-500 text-sm mt-1">
                            {errors.first_name[0]}
                        </p>
                    )}
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700">
                        Nama Belakang
                    </label>
                    <input
                        type="text"
                        name="last_name"
                        value={form.last_name}
                        onChange={handleChange}
                        className="w-full p-2 border rounded"
                        required
                    />
                    {errors.last_name && (
                        <p className="text-red-500 text-sm mt-1">
                            {errors.last_name[0]}
                        </p>
                    )}
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700">
                        Email
                    </label>
                    <input
                        type="email"
                        name="email"
                        value={form.email}
                        onChange={handleChange}
                        className="w-full p-2 border rounded"
                        required
                    />
                    {errors.email && (
                        <p className="text-red-500 text-sm mt-1">
                            {errors.email[0]}
                        </p>
                    )}
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700">
                        Password Baru (opsional)
                    </label>
                    <input
                        type="password"
                        name="password"
                        value={form.password}
                        onChange={handleChange}
                        className="w-full p-2 border rounded"
                    />
                    {errors.password && (
                        <p className="text-red-500 text-sm mt-1">
                            {errors.password[0]}
                        </p>
                    )}
                </div>
                <div className="flex justify-between items-center mt-6">
                    <button
                        type="submit"
                        className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
                        Simpan Perubahan
                    </button>

                    <button
                        type="button"
                        onClick={logout}
                        className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700">
                        Logout
                    </button>
                </div>
            </form>
        </div>
    )
}
