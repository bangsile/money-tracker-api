import { describe, it, expect, afterEach, beforeEach } from "bun:test";
import app from "../src";
import { CategoryTest, UserTest } from "./test-util";
import { logger } from "../src/application/logging";

describe("POST /api/categories", () => {
	beforeEach(async () => {
        await CategoryTest.delete()
		await UserTest.create();
	});
	afterEach(async () => {
        await CategoryTest.delete()
		await UserTest.delete();
	});

	it("should reject if request invalid", async () => {
		const response = await app.request("/api/categories", {
			method: "POST",
			headers: {
				Authorization: "test",
			},
			body: JSON.stringify({
				username: "",
				name: "",
				type: "",
			}),
		});

		expect(response.status).toBe(400);
		const body = await response.json();
		logger.debug(body);
		expect(body.errors).toBeDefined();
	});

	it("should success request valid", async () => {
		const response = await app.request("/api/categories", {
			method: "POST",
			headers: {
				Authorization: "test",
			},
			body: JSON.stringify({
				username: "test",
				name: "transportasi",
				type: "EXPENSE",
			}),
		});

		expect(response.status).toBe(200);
		const body = await response.json();
		logger.debug(body);
		expect(body.data).toBeDefined();
	});
});

describe("GET /api/categories", () => {
	beforeEach(async () => {
        await CategoryTest.delete()
		await UserTest.create();
        await CategoryTest.create()
	});
	afterEach(async () => {
        await CategoryTest.delete()
		await UserTest.delete();
	});

	it("should return 400 if categoryId has invalid format", async () => {
		const response = await app.request("/api/categories/formattidak12byte", {
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

	it("should return 404 if category not found", async () => {
		const response = await app.request("/api/categories/66598f2d3f4b6e2a9c6e7f43", {
			method: "GET",
			headers: {
				Authorization: "test",
			},
		});

		expect(response.status).toBe(404);
		const body = await response.json();
		logger.debug(body);
		expect(body.errors).toBeDefined();
	});

	it("should success get category if categoryId valid", async () => {

		const response = await app.request("/api/categories/66598f2d3f4b6e2a9c6e7f42", {
			method: "GET",
			headers: {
				Authorization: "test",
			},
		});

		expect(response.status).toBe(200);
		const body = await response.json();
		logger.debug(body);
		expect(body.data).toBeDefined();
	});
});

describe("PATCH /api/categories", () => {
	beforeEach(async () => {
		await CategoryTest.delete()
		await UserTest.create();
		await CategoryTest.create()
	});
	afterEach(async () => {
		await CategoryTest.delete()
		await UserTest.delete();
	});

	it("should return 400 if categoryId has invalid format", async () => {
		const response = await app.request("/api/categories/formattidak12byte", {
			method: "PATCH",
			headers: {
				Authorization: "test",
			},
			body: JSON.stringify({
				name: "Freelance",
				type: "INCOME"
			})
		});

		expect(response.status).toBe(400);
		const body = await response.json();
		logger.debug(body);
		expect(body.errors).toBeDefined();
	});

	it("should return 404 if category not found", async () => {
		const response = await app.request("/api/categories/66598f2d3f4b6e2a9c6e7f43", {
			method: "PATCH",
			headers: {
				Authorization: "test",
			},
			body: JSON.stringify({
				name: "Freelance",
				type: "INCOME"
			})
		});

		expect(response.status).toBe(404);
		const body = await response.json();
		logger.debug(body);
		expect(body.errors).toBeDefined();
	});

	it("should return 400 if request invalid", async () => {
		const response = await app.request("/api/categories/66598f2d3f4b6e2a9c6e7f43", {
			method: "PATCH",
			headers: {
				Authorization: "test",
			},
			body: JSON.stringify({
				name: "",
				type: ""
			})
		});

		expect(response.status).toBe(400);
		const body = await response.json();
		logger.debug(body);
		expect(body.errors).toBeDefined();
	});

	it("should return 400 if request (type) invalid", async () => {
		const response = await app.request("/api/categories/66598f2d3f4b6e2a9c6e7f43", {
			method: "PATCH",
			headers: {
				Authorization: "test",
			},
			body: JSON.stringify({
				name: "Freelance",
				type: "masukan"
			})
		});

		expect(response.status).toBe(400);
		const body = await response.json();
		logger.debug(body);
		expect(body.errors).toBeDefined();
	});

	it("should success update category if categoryId and request valid", async () => {
		const response = await app.request("/api/categories/66598f2d3f4b6e2a9c6e7f42", {
			method: "PATCH",
			headers: {
				Authorization: "test",
			},
			body: JSON.stringify({
				name: "Freelance",
				type: "INCOME"
			})
		});

		expect(response.status).toBe(200);
		const body = await response.json();
		logger.debug(body);
		expect(body.data).toBeDefined();
		expect(body.data.name).toBe("Freelance");
		expect(body.data.type).toBe("INCOME");
	});
});

describe("GET /api/categories", () => {
	beforeEach(async () => {
		await CategoryTest.delete()
		await UserTest.create();
		await CategoryTest.createMany(10)
	});
	afterEach(async () => {
		await CategoryTest.delete()
		await UserTest.delete();
	});

	it("should success list categories", async () => {
		const response = await app.request("/api/categories", {
			method: "GET",
			headers: {
				Authorization: "test",
			},
		});

		expect(response.status).toBe(200);
		const body = await response.json();
		logger.debug(body);
		expect(body.data).toBeDefined();
		expect(body.data.length).toBe(10);
	});
})
