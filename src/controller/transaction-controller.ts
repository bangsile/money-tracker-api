import { Hono } from "hono";
import { ApplicationVariables } from "../model/app-model";
import { authMiddleware } from "../middleware/auth-middleware";
import { CreateTransactionRequest, UpdateTransactionRequest } from "../model/transaction-model";
import { TransactionService } from "../service/transaction-service";

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