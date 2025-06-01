import { HTTPException } from "hono/http-exception";
import { prisma } from "../application/database";
import { User } from "../generated/prisma";
import {
	CreateTransactionRequest,
	toTransactionResponse,
	TransactionResponse,
    UpdateTransactionRequest,
} from "../model/transaction-model";
import { TransactionValidation } from "../validation/transaction-validation";

export class TransactionService {
	static async create(
		user: User,
		request: CreateTransactionRequest
	): Promise<TransactionResponse> {
		request = TransactionValidation.CREATE.parse(request);

		const transaction = await prisma.transaction.create({
			data: {
				categoryId: request.categoryId,
				username: user.username,
				amount: request.amount,
				description: request.description,
				date: new Date(request.date),
			},
		});

		return toTransactionResponse(transaction);
	}

	static async get(transactionId: string): Promise<TransactionResponse> {
        transactionId = TransactionValidation.GET.parse(transactionId)

        const transaction = await prisma.transaction.findUnique({
            where: {
                id: transactionId
            }
        })

        if (!transaction) {
            throw new HTTPException(404, {
                message: "Transaction not found"
            })
        }

        return toTransactionResponse(transaction)
    }

	static async update(transactionId: string, request: UpdateTransactionRequest): Promise<TransactionResponse> {
        transactionId = TransactionValidation.GET.parse(transactionId)
        request = TransactionValidation.UPDATE.parse(request)

        let transaction = await prisma.transaction.findUnique({
            where: {
                id: transactionId
            }
        })

        if (!transaction) {
            throw new HTTPException(404, {
                message: "Transaction not found"
            })
        }
        request.date = new Date(request.date)
        transaction = await prisma.transaction.update({
            where: {
                id: transactionId
            },
            data: request
        })

        return toTransactionResponse(transaction)
    }

    static async delete(transactionId: string): Promise<Boolean> {
        transactionId = TransactionValidation.GET.parse(transactionId)
        
        let transaction = await prisma.transaction.findUnique({
            where: {
                id: transactionId
            }
        })

        if (!transaction) {
            throw new HTTPException(404, {
                message: "Transaction not found"
            })
        }

        transaction = await prisma.transaction.delete({
            where: {
                id: transactionId
            },
        })

        return true
    }
}
