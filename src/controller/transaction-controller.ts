import { Hono } from "hono";
import { ApplicationVariables } from "../model/app-model";
import { authMiddleware } from "../middleware/auth-middleware";
import { CreateTransactionRequest } from "../model/transaction-model";
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