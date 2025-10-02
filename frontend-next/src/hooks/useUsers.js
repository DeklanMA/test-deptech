'use client'

import useSWR from 'swr'
import axios from '@/lib/axios'

export const useUsers = () => {
    const {
        data: users,
        error,
        mutate,
    } = useSWR('/api/users', () =>
        axios.get('/api/users').then(res => res.data),
    )

    const isLoading = !error && !users

    const createUser = async ({ setErrors, ...props }) => {
        setErrors({})
        try {
            await axios.post('/api/users', props)
            mutate()
            return true
        } catch (err) {
            if (err.response?.status === 422) {
                setErrors(err.response.data.errors)
                return false
            }
            console.error(err)
            throw err
        }
    }

    const updateUser = async (id, { setErrors, ...props }) => {
        setErrors({})
        try {
            await axios.put(`/api/users/${id}`, props)
            mutate()
            return true
        } catch (err) {
            if (err.response?.status === 422) {
                setErrors(err.response.data.errors)
                return false
            }
            console.error(err)
            throw err
        }
    }

    const deleteUser = async id => {
        try {
            await axios.delete(`/api/users/${id}`)
            mutate()
            return true
        } catch (err) {
            console.error('Failed to delete user:', err)
            throw err
        }
    }

    return {
        users,
        isLoading,
        error,
        createUser,
        updateUser,
        deleteUser,
    }
}
