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
}