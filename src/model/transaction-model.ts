import { Category, Transaction } from "../generated/prisma"

export type CreateTransactionRequest = {
    categoryId: string,
    amount: number,
    description: string,
    date: Date
}

export type TransactionResponse = {
    id: string,
    username: string,
    amount: number,
    description?: string | null,
    date: Date
    category?: {
        id: string,
        name: string,
        type: 'INCOME' | 'EXPENSE'
    }
}

export type UpdateTransactionRequest = {
    amount: number,
    description: string,
    date: Date
}

export type ListTransactionRequest = {
    type?: string
    start?: string
    end?: string
    page: number 
    size: number 
}

export function toTransactionResponse(transaction: Transaction & { category?: Category }): TransactionResponse {
    return {
        id: transaction.id,
        username: transaction.username,
        amount: transaction.amount,
        description: transaction.description,
        date: transaction.date,
        category: transaction.category
            ? {
                id: transaction.category.id,
                name: transaction.category.name,
                type: transaction.category.type
            }
            : undefined
    }
}