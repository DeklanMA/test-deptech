'use client'

import { useState, useRef, useEffect } from 'react'
import Link from 'next/link'

const ActionMenu = ({ editHref, onDelete }) => {
    const [open, setOpen] = useState(false)
    const menuRef = useRef(null)

    // Tutup menu kalau klik di luar
    useEffect(() => {
        const handleClickOutside = e => {
            if (menuRef.current && !menuRef.current.contains(e.target)) {
                setOpen(false)
            }
        }
        document.addEventListener('mousedown', handleClickOutside)
        return () =>
            document.removeEventListener('mousedown', handleClickOutside)
    }, [])

    return (
        <div className="relative" ref={menuRef}>
            <button
                onClick={() => setOpen(!open)}
                className="px-3 py-1 text-sm rounded bg-gray-100 hover:bg-gray-200 dark:bg-gray-700 dark:hover:bg-gray-600">
                ⋮
            </button>

            {open && (
                <div className="absolute right-0 mt-2 w-28 bg-white border border-gray-200 rounded shadow-lg z-50">
                    <ul className="py-1 text-sm text-gray-700">
                        <li>
                            <Link
                                href={editHref}
                                className="block px-4 py-2 text-center hover:bg-gray-100">
                                Edit
                            </Link>
                        </li>
                        <li>
                            <button
                                onClick={onDelete}
                                className="w-full text-center px-4 py-2 hover:bg-gray-100">
                                Delete
                            </button>
                        </li>
                    </ul>
                </div>
            )}
        </div>
    )
}

export default ActionMenu
