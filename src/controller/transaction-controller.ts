import { Hono } from "hono";
import { ApplicationVariables } from "../model/app-model";
import { authMiddleware } from "../middleware/auth-middleware";
import { CreateTransactionRequest, ListTransactionRequest, UpdateTransactionRequest } from "../model/transaction-model";
import { TransactionService } from "../service/transaction-service";
import { User } from "../generated/prisma";

export const transactionController = new Hono<{ Variables: ApplicationVariables }>();

transactionController.use(authMiddleware)

transactionController.post("/api/transactions", async (c) => {
    const user = c.get("user")
    const request = await c.req.json() as CreateTransactionRequest
    const response = await TransactionService.create(user, request)

    return c.json({
        data: response
    })
})

transactionController.get("/api/transactions/:transactionId", async (c) => {
    const transationId = c.req.param("transactionId")
    const response = await TransactionService.get(transationId)

    return c.json({
        data: response
    })
})

transactionController.patch("/api/transactions/:transactionId", async (c) => {
    const transationId = c.req.param("transactionId")
    const request = await c.req.json() as UpdateTransactionRequest
    const response = await TransactionService.update(transationId, request)

    return c.json({
        data: response
    })
})

transactionController.delete("/api/transactions/:transactionId", async (c) => {
    const transationId =  c.req.param("transactionId")
    const response = await TransactionService.delete(transationId)

    return c.json({
        data: response
    })
})

transactionController.get('/api/transactions', async (c) => {
    const user = c.get('user') as User

    const request: ListTransactionRequest = {
        type: c.req.query("type"),
        start:  c.req.query("start"),
        end: c.req.query("end"),
        page: c.req.query("page") ? Number(c.req.query("page")) : 1,
        size: c.req.query("size") ? Number(c.req.query("size")) : 10,
    }
    const response = await TransactionService.list(user, request)
    return c.json(response)
})