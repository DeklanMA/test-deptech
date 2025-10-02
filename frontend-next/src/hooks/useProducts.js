'use client'

import useSWR from 'swr'
import axios from '@/lib/axios'

export const useProducts = () => {
    const {
        data: products,
        error,
        mutate,
    } = useSWR('/api/products', () =>
        axios.get('/api/products').then(res => res.data),
    )

    const isLoading = !error && !products

    const createProduct = async ({ setErrors, formData }) => {
        setErrors({})
        try {
            await axios.post('/api/products', formData, {
                headers: { 'Content-Type': 'multipart/form-data' },
            })
            mutate()
            return true
        } catch (error) {
            if (error.response?.status === 422) {
                setErrors(error.response.data.errors)
                return false
            } else {
                throw error
            }
        }
    }

    const updateProduct = async (id, { setErrors, formData }) => {
        setErrors({})
        try {
            formData.append('_method', 'PUT')
            await axios.post(`/api/products/${id}`, formData, {
                headers: { 'Content-Type': 'multipart/form-data' },
            })
            mutate()
            return true
        } catch (error) {
            if (error.response?.status === 422) {
                setErrors(error.response.data.errors)
                return false
            } else {
                throw error
            }
        }
    }

    const deleteProduct = async id => {
        await axios.delete(`/api/products/${id}`)
        mutate()
    }

    return {
        products,
        isLoading,
        error,
        createProduct,
        updateProduct,
        deleteProduct,
    }
}
