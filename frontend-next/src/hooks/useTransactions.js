'use client'

import useSWR from 'swr'
import axios from '@/lib/axios'

export const useTransactions = () => {
    const {
        data: transactions,
        error,
        mutate,
    } = useSWR('/api/transactions', () =>
        axios.get('/api/transactions').then(res => res.data),
    )

    const createTransaction = async ({ setErrors, ...props }) => {
        setErrors([])
        try {
            await axios.post('/api/transactions', props)
            mutate()
        } catch (error) {
            if (error.response?.status === 422) {
                setErrors(error.response.data.errors)
            } else {
                throw error
            }
        }
    }

    return {
        transactions,
        error,
        createTransaction,
    }
}
