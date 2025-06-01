import { prisma } from "../application/database";
import { User } from "../generated/prisma";
import {
	CreateTransactionRequest,
	toTransactionResponse,
	TransactionResponse,
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
}
