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
