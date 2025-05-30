import { Category } from "../generated/prisma"

export type CategoryType = "INCOME" | "EXPENSE"

export type CreateCategoryRequest = {
    username: string,
    name: string,
    type: CategoryType
}

export type CategoryResponse = {
    id: string,
    username: string,
    name: string,
    type: string
}

export function toCategoryResponse(category: Category): CategoryResponse {
    return ({
        id: category.id,
        username: category.username,
        name: category.name,
        type:category.type
    })
}