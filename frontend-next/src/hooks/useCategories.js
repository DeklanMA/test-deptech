'use client'

import useSWR from 'swr'
import axios from '@/lib/axios'

export const useCategories = () => {
    const {
        data: categories,
        error,
        mutate,
    } = useSWR('/api/categories', () =>
        axios.get('/api/categories').then(res => res.data),
    )

    const createCategory = async ({ setErrors, ...props }) => {
        setErrors([])
        try {
            await axios.post('/api/categories', props)
            mutate()
        } catch (error) {
            if (error.response?.status === 422) {
                setErrors(error.response.data.errors)
            } else {
                throw error
            }
        }
    }

    const updateCategory = async (id, { setErrors, ...props }) => {
        setErrors([])
        try {
            await axios.put(`/api/categories/${id}`, props)
            mutate()
        } catch (error) {
            if (error.response?.status === 422) {
                setErrors(error.response.data.errors)
            } else {
                throw error
            }
        }
    }

    const deleteCategory = async id => {
        await axios.delete(`/api/categories/${id}`)
        mutate()
    }

    return {
        categories,
        error,
        createCategory,
        updateCategory,
        deleteCategory,
    }
}
