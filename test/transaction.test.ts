import { describe, it, expect, afterEach, beforeEach } from "bun:test";
import app from "../src";
import { CategoryTest, TransactionTest, UserTest } from "./test-util";
import { logger } from "../src/application/logging";

describe("POST /api/categories", () => {
	beforeEach(async () => {
        await CategoryTest.delete()
		await UserTest.create();
        await CategoryTest.create();
	});
	afterEach(async () => {
        await TransactionTest.delete();
        await CategoryTest.delete()
		await UserTest.delete();
	});

	it("should reject if request invalid", async () => {
		const response = await app.request("/api/transactions", {
			method: "POST",
			headers: {
				Authorization: "test",
			},
			body: JSON.stringify({
                categoryId: "",
                username: "",
                amount: "",
                date: ""
			}),
		});

		expect(response.status).toBe(400);
		const body = await response.json();
		logger.debug(body);
		expect(body.errors).toBeDefined();
	});

	it("should success request valid", async () => {
		const response = await app.request("/api/transactions", {
			method: "POST",
			headers: {
				Authorization: "test",
			},
			body: JSON.stringify({
                categoryId: "66598f2d3f4b6e2a9c6e7f42",
				username: "test",
                amount: 120000,
                description: "test",
                date: "2025-01-31"
			}),
		});

		expect(response.status).toBe(200);
		const body = await response.json();
		logger.debug(body);
		expect(body.data).toBeDefined();
	});
});

describe("GET /api/transaction/{transactionId}", () => {
	beforeEach(async () => {
		await CategoryTest.delete();
		await UserTest.create();
		await CategoryTest.create();
        await TransactionTest.create();
	});
	afterEach(async () => {
		await TransactionTest.delete();
		await CategoryTest.delete();
		await UserTest.delete();
	});

	it("should reject if transactionId has invalid format", async () => {
		const response = await app.request("/api/transactions/formatalas", {
			method: "GET",
			headers: {
				Authorization: "test",
			},
		});

		expect(response.status).toBe(400);
		const body = await response.json();
		logger.debug(body);
		expect(body.errors).toBeDefined();
	});

	it("should return 404 if transaction not found", async () => {
		const response = await app.request(
			"/api/transactions/6659fc7d5f74f8a4b3c1d9ca",
			{
				method: "GET",
				headers: {
					Authorization: "test",
				},
			}
		);

		expect(response.status).toBe(404);
		const body = await response.json();
		logger.debug(body);
		expect(body.errors).toBeDefined();
	});

	it("should success if transactionId is valid", async () => {
		const response = await app.request(
			"/api/transactions/6659fc7d5f74f8a4b3c1d9ab",
			{
				method: "GET",
				headers: {
					Authorization: "test",
				},
			}
		);

		expect(response.status).toBe(200);
		const body = await response.json();
		logger.debug(body);
		expect(body.data).toBeDefined();
	});
});

describe("PATCH /api/transaction/{transactionId}", () => {
	beforeEach(async () => {
		await CategoryTest.delete();
		await UserTest.create();
		await CategoryTest.create();
        await TransactionTest.create();
	});
	afterEach(async () => {
		await TransactionTest.delete();
		await CategoryTest.delete();
		await UserTest.delete();
	});

	it("should reject if transactionId has invalid format", async () => {
		const response = await app.request("/api/transactions/formatalas", {
			method: "PATCH",
			headers: {
				Authorization: "test",
			},
            body: JSON.stringify({
                categoryId: "66598f2d3f4b6e2a9c6e7f42",
				username: "test",
				amount: 20000,
				description: "testa",
				date: "2025-05-28"
            })
		});

		expect(response.status).toBe(400);
		const body = await response.json();
		logger.debug(body);
		expect(body.errors).toBeDefined();
	});

	it("should return 404 if transaction not found", async () => {
		const response = await app.request(
			"/api/transactions/6659fc7d5f74f8a4b3c1d9ca",
			{
				method: "PATCH",
				headers: {
					Authorization: "test",
				},
                body: JSON.stringify({
                    categoryId: "66598f2d3f4b6e2a9c6e7f42",
                    username: "test",
                    amount: 20000,
                    description: "testa",
                    date: "2025-05-28"
                })
			}
		);

		expect(response.status).toBe(404);
		const body = await response.json();
		logger.debug(body);
		expect(body.errors).toBeDefined();
	});

	it("should return 400 if request not valid", async () => {
		const response = await app.request(
			"/api/transactions/6659fc7d5f74f8a4b3c1d9ab",
			{
				method: "PATCH",
				headers: {
					Authorization: "test",
				},
                body: JSON.stringify({
                    categoryId: "",
                    username: "",
                    amount: "",
                    description: "",
                    date: ""
                })
			}
		);

		expect(response.status).toBe(400);
		const body = await response.json();
		logger.debug(body);
		expect(body.errors).toBeDefined();
	});

	it("should success if transactionId and request is valid", async () => {
		const response = await app.request(
			"/api/transactions/6659fc7d5f74f8a4b3c1d9ab",
			{
				method: "PATCH",
				headers: {
					Authorization: "test",
				},
                body: JSON.stringify({
                    categoryId: "66598f2d3f4b6e2a9c6e7f42",
                    username: "test",
                    amount: 20000,
                    description: "testa",
                    date: "2025-05-28"
                })
			}
		);

		expect(response.status).toBe(200);
		const body = await response.json();
		logger.debug(body);
		expect(body.data).toBeDefined();
	});
});

describe("DELETE /api/transactions/{transactionId}", () => {
	beforeEach(async () => {
        await CategoryTest.delete();
		await UserTest.create();
        await CategoryTest.create();
		await TransactionTest.create();
	});
	afterEach(async () => {
		await TransactionTest.delete();
        await CategoryTest.delete();
		await UserTest.delete();
	});

	it("should return 400 if transactionId has invalid format", async () => {
		const response = await app.request("/api/transactions/formattidak12byte", {
			method: "DELETE",
			headers: {
				Authorization: "test",
			},
		});

		expect(response.status).toBe(400);
		const body = await response.json();
		logger.debug(body);
		expect(body.errors).toBeDefined();
	});

	it("should return 404 if transaction not found", async () => {
		const response = await app.request("/api/transactions/66598f2d3f4b6e2a9c6e7f43", {
			method: "DELETE",
			headers: {
				Authorization: "test",
			},
		});

		expect(response.status).toBe(404);
		const body = await response.json();
		logger.debug(body);
		expect(body.errors).toBeDefined();
	});

	it("should success delete category if transactionId valid", async () => {

		const response = await app.request("/api/transactions/6659fc7d5f74f8a4b3c1d9ab", {
			method: "DELETE",
			headers: {
				Authorization: "test",
			},
		});

		expect(response.status).toBe(200);
		const body = await response.json();
		logger.debug(body);
		expect(body.data).toBeDefined();
		expect(body.data).toBe(true);
	});
});

describe("GET /api/transactions", () => {
	beforeEach(async () => {
		await CategoryTest.delete();
		await UserTest.create();
		await CategoryTest.create();
        await TransactionTest.create();
	});
	afterEach(async () => {
		await TransactionTest.delete();
		await CategoryTest.delete();
		await UserTest.delete();
	});

	// it("should reject if transactionId has invalid format", async () => {
	// 	const response = await app.request("/api/transactions/formatalas", {
	// 		method: "GET",
	// 		headers: {
	// 			Authorization: "test",
	// 		},
	// 	});

	// 	expect(response.status).toBe(400);
	// 	const body = await response.json();
	// 	logger.debug(body);
	// 	expect(body.errors).toBeDefined();
	// });

	// it("should return 404 if transaction not found", async () => {
	// 	const response = await app.request(
	// 		"/api/transactions/6659fc7d5f74f8a4b3c1d9ca",
	// 		{
	// 			method: "GET",
	// 			headers: {
	// 				Authorization: "test",
	// 			},
	// 		}
	// 	);

	// 	expect(response.status).toBe(404);
	// 	const body = await response.json();
	// 	logger.debug(body);
	// 	expect(body.errors).toBeDefined();
	// });

	it("should success if transactionId is valid", async () => {
		const response = await app.request(
			"/api/transactions",
			{
				method: "GET",
				headers: {
					Authorization: "test",
				},
			}
		);

		expect(response.status).toBe(200);
		const body = await response.json();
		logger.debug(body);
		expect(body.data).toBeDefined();
	});

	it("should success if query page is valid", async () => {
		const response = await app.request(
			"/api/transactions?page=2",
			{
				method: "GET",
				headers: {
					Authorization: "test",
				},
			}
		);

		expect(response.status).toBe(200);
		const body = await response.json();
		logger.debug(body);
		expect(body.data).toBeDefined();
	});

	it("should success if query type is valid", async () => {
		const response = await app.request(
			"/api/transactions?type=EXPENSE",
			{
				method: "GET",
				headers: {
					Authorization: "test",
				},
			}
		);

		expect(response.status).toBe(200);
		const body = await response.json();
		logger.debug(body);
		expect(body.data).toBeDefined();
	});
	it("should success if query start date is valid", async () => {
		const response = await app.request(
			"/api/transactions?start=2025-05-20",
			{
				method: "GET",
				headers: {
					Authorization: "test",
				},
			}
		);

		expect(response.status).toBe(200);
		const body = await response.json();
		logger.debug(body);
		expect(body.data).toBeDefined();
	});

	it("should success if query start date is valid", async () => {
		const response = await app.request(
			"/api/transactions?end=2025-05-20",
			{
				method: "GET",
				headers: {
					Authorization: "test",
				},
			}
		);

		expect(response.status).toBe(200);
		const body = await response.json();
		logger.debug(body);
		expect(body.data).toBeDefined();
	});
});