import { Category } from "../generated/prisma"

export type CategoryType = "INCOME" | "EXPENSE"

export type CreateCategoryRequest = {
    name: string,
    type: CategoryType
}

export type CategoryResponse = {
    id: string,
    name: string,
    type: CategoryType
}

export function toCategoryResponse(category: Category): CategoryResponse {
    return ({
        id: category.id,
        name: category.name,
        type:category.type
    })
}