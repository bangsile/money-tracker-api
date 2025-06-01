import { HTTPException } from "hono/http-exception";
import { prisma } from "../application/database";
import { User } from "../generated/prisma";
import { CategoryResponse, CreateCategoryRequest, toCategoryResponse, UpdateCategoryRequest } from "../model/category-model";
import { CategoryValidation } from "../validation/category-validation";

export class CategoryService {
    
    static async create(user:User, request: CreateCategoryRequest): Promise<CategoryResponse> {
        request = CategoryValidation.CREATE.parse(request)

        const category = await prisma.category.create({
            data: {
                name: request.name,
                type: request.type,
                username: user.username
            }
        })

        return toCategoryResponse(category)
    }

    static async get(categoryId: string): Promise<CategoryResponse> {
        categoryId = CategoryValidation.GET.parse(categoryId)

        const category = await prisma.category.findFirst({
            where: { 
                id: categoryId,
            }
        })

        if (!category) {
            throw new HTTPException(404, {
                message: "Category not found"
            })
        }

        return toCategoryResponse(category)
    }

    static async update(categoryId: string, request: UpdateCategoryRequest): Promise<CategoryResponse> {
        categoryId = CategoryValidation.GET.parse(categoryId)
        request = CategoryValidation.UPDATE.parse(request)

        let category = await prisma.category.findFirst({
            where: {
                id: categoryId
            }
        })

        if (!category) {
            throw new HTTPException(404, {
                message: "Category not found"
            })
        }

        category = await prisma.category.update({
            where: {
                id: categoryId
            },
            data: request
        })

        return toCategoryResponse(category)
    }

    static async list(user: User): Promise<CategoryResponse[]> {

        let categories = await prisma.category.findMany({
            where: {
                username: user.username
            }
        })

        return categories.map(toCategoryResponse)
    }

    static async delete(categoryId: string): Promise<Boolean> {
        categoryId = CategoryValidation.GET.parse(categoryId)

        const category = await prisma.category.findFirst({
            where: {
                id: categoryId
            }
        })

        if (!category) {
            throw new HTTPException(404, {
                message: "Category not found"
            })
        }

        await prisma.category.delete({
            where: {
                id: categoryId
            }
        })

        return true
    }
}