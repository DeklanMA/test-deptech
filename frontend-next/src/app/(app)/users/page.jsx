'use client'

import { useUsers } from '@/hooks/useUsers'
import Table from '@/components/Table'
import Link from 'next/link'

export default function UsersPage() {
    const { users, isLoading, deleteUser } = useUsers()

    const columns = [
        'id',
        'first_name',
        'last_name',
        'email',
        'birth_date',
        'gender',
    ]

    if (isLoading) return <p>Loading...</p>
    if (!users) return <p>No users found.</p>

    return (
        <div>
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-bold">Users</h1>
                <Link
                    href="/users/create"
                    className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
                    + Create User
                </Link>
            </div>

            <Table
                columns={columns}
                data={users}
                showActions={true}
                basePath="/users"
                onDelete={deleteUser} 
            />
        </div>
    )
}
