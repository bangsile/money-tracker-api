import { HTTPException } from "hono/http-exception";
import { prisma } from "../application/database";
import { User } from "../generated/prisma";
import { CategoryResponse, CreateCategoryRequest, toCategoryResponse } from "../model/category-model";
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
}