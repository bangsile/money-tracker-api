import { Hono } from "hono";
import { ApplicationVariables } from "../model/app-model";
import { CategoryService } from "../service/category-service";
import { CreateCategoryRequest, UpdateCategoryRequest } from "../model/category-model";
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

categoryController.get("/api/categories/:categoryId", async (c) => {
    const categoryId = c.req.param("categoryId");

    const response = await CategoryService.get(categoryId);

    return c.json({
        data: response
    })
})

categoryController.patch("/api/categories/:categoryId", async (c) => {
    const categoryId = c.req.param("categoryId")
    const request = await c.req.json() as UpdateCategoryRequest
    const response = await CategoryService.update(categoryId, request)

    return c.json({
        data: response
    })
})

categoryController.get("/api/categories", async (c) => {
    const user = c.get("user")
    const response = await CategoryService.list(user)

    return c.json({
        data: response
    })
})