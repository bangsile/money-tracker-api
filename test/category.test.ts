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
