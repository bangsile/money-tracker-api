import { Hono } from "hono";
import { ApplicationVariables } from "../model/app-model";
import { CategoryService } from "../service/category-service";
import { CreateCategoryRequest } from "../model/category-model";
import { authMiddleware } from "../middleware/auth-middleware";

export const categoryController = new Hono<{ Variables: ApplicationVariables }>();

categoryController.use(authMiddleware)

categoryController.post("/api/categories", async (c) => {
    const user = c.get("user")
    const request = await c.req.json() as CreateCategoryRequest;
    const response = await CategoryService.create(user, request)

    return c.json({
        data: response
    })
})
