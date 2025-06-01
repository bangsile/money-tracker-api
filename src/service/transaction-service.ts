import { HTTPException } from "hono/http-exception";
import { prisma } from "../application/database";
import { User } from "../generated/prisma";
import {
	CreateTransactionRequest,
	ListTransactionRequest,
	toTransactionResponse,
	TransactionResponse,
    UpdateTransactionRequest,
} from "../model/transaction-model";
import { TransactionValidation } from "../validation/transaction-validation";
import { Pageable } from "../model/page-model";

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

    static async list(user: User, request: ListTransactionRequest): Promise<Pageable<TransactionResponse>> {
        request = TransactionValidation.LIST.parse(request);

        const filters: any = [];

        if (request.type) {
        filters.push({
            category: {
            type: request.type,
            },
        });
        }

        if (request.start || request.end) {
        const dateFilter: any = {};
        if (request.start) {
            dateFilter.gte = new Date(request.start);
        }
        if (request.end) {
            dateFilter.lte = new Date(request.end);
        }

        filters.push({
            date: dateFilter,
        });
        }

        const skip = (request.page - 1) * request.size;

        const transactions = await prisma.transaction.findMany({
        where: {
            username: user.username,
            AND: filters,
        },
        include: {
            category: true,
        },
        take: request.size,
        skip: skip,
        });

        const total = await prisma.transaction.count({
            where: {
                username: user.username,
                AND: filters
            }
        })

        return {
            data: transactions.map(contact => toTransactionResponse(contact)),
            paging: {
                current_page: request.page,
                size: request.size,
                total_page: Math.ceil(total / request.size)
            }
        }
    }
}
