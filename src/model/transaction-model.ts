import { Transaction } from "../generated/prisma"

export type CreateTransactionRequest = {
    categoryId: string,
    amount: number,
    description: string,
    date: Date
}

export type TransactionResponse = {
    id: string,
    username: string,
    categoryId: string,
    amount: number,
    description?: string | null,
    date: Date
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

export function toTransactionResponse(transaction: Transaction): TransactionResponse {
    return ({
        id: transaction.id,
        username: transaction.username,
        categoryId: transaction.categoryId,
        amount: transaction.amount,
        description: transaction.description,
        date: transaction.date
    })
}