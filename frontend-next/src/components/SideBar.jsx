'use client'

import Link from 'next/link'
import { useAuth } from '@/hooks/auth'

const Sidebar = ({ user }) => {
    const { logout } = useAuth()

    const menus = [
        { name: 'Dashboard', href: '/dashboard', icon: '📊' },
        { name: 'Users', href: '/users', icon: '👥' },
        { name: 'Products', href: '/products', icon: '📦' },
        { name: 'Categories', href: '/categories', icon: '🗂️' },
        { name: 'Orders', href: '/orders', icon: '🧾' },
        { name: 'Settings', href: '/settings', icon: '⚙️' },
    ]

    return (
        <aside className="fixed top-0 left-0 z-40 w-64 h-screen bg-gray-50 dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700">
            <div className="h-full px-3 py-4 overflow-y-auto">
                {/* Logo / Brand */}
                <div className="mb-6 px-2">
                    <Link
                        href="/dashboard"
                        className="text-2xl font-bold text-gray-800 dark:text-white">
                        🚀 Admin Panel
                    </Link>
                </div>

                {/* Navigation */}
                <ul className="space-y-2 font-medium">
                    {menus.map(menu => (
                        <li key={menu.name}>
                            <Link
                                href={menu.href}
                                className="flex items-center p-2 text-gray-900 rounded-lg hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700">
                                <span className="text-lg">{menu.icon}</span>
                                <span className="ms-3">{menu.name}</span>
                            </Link>
                        </li>
                    ))}

                    {/* Logout */}
                    <li>
                        <button
                            onClick={logout}
                            className="w-full flex items-center p-2 text-gray-900 rounded-lg hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700">
                            <span className="text-lg">🚪</span>
                            <span className="ms-3">Logout</span>
                        </button>
                    </li>
                </ul>

                {/* User Info */}
                {user && (
                    <div className="absolute bottom-4 left-3 right-3 p-3 rounded bg-gray-100 dark:bg-gray-700">
                        <p className="text-sm font-medium text-gray-900 dark:text-white">
                            {user.first_name} {user.last_name}
                        </p>
                        <p className="text-xs text-gray-500">{user.email}</p>
                    </div>
                )}
            </div>
        </aside>
    )
}

export default Sidebar
