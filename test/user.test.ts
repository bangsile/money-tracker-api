import { describe, it, expect, afterEach, beforeEach } from "bun:test";
import { logger } from "../src/application/logging";
import app from "../src";
import { UserTest } from "./test-util";

describe("POST /api/users", () => {
	afterEach(async () => {
		await UserTest.delete();
	});

	it("should reject register new user if request is invalid", async () => {
		const response = await app.request("/api/users", {
			method: "POST",
			body: JSON.stringify({
				username: "",
				password: "",
				name: "",
			}),
		});

		const body = await response.json();
		logger.debug(body);

		expect(response.status).toBe(400);
		expect(body.errors).toBeDefined();
	});

	it("should reject register new user if username already exists", async () => {
		await UserTest.create();

		const response = await app.request("/api/users", {
			method: "POST",
			body: JSON.stringify({
				username: "test",
				password: "test",
				name: "test",
			}),
		});

		const body = await response.json();
		logger.debug(body);

		expect(response.status).toBe(400);
		expect(body.errors).toBeDefined();
	});

	it("should register new user success", async () => {
		const response = await app.request("/api/users", {
			method: "POST",
			body: JSON.stringify({
				username: "test",
				password: "test",
				name: "test",
			}),
		});

		const body = await response.json();
		logger.debug(body);

		expect(response.status).toBe(200);
		expect(body.data).toBeDefined();
		expect(body.data.username).toBe("test");
		expect(body.data.name).toBe("test");
	});
});

describe("POST /api/users/login", () => {
	beforeEach(async () => {
		await UserTest.create();
	});

	afterEach(async () => {
		await UserTest.delete();
	});

	it("should be able to login", async () => {
		const response = await app.request("/api/users/login", {
			method: "POST",
			body: JSON.stringify({
				username: "test",
				password: "test",
			}),
		});

		expect(response.status).toBe(200);

		const body = await response.json();
		expect(body.data.token).toBeDefined();
	});

	it("should be rejected if username is wrong", async () => {
		const response = await app.request("/api/users/login", {
			method: "POST",
			body: JSON.stringify({
				username: "salah",
				password: "test",
			}),
		});

		expect(response.status).toBe(401);

		const body = await response.json();
		expect(body.errors).toBeDefined();
	});

	it("should be rejected if password is wrong", async () => {
		const response = await app.request("/api/users/login", {
			method: "POST",
			body: JSON.stringify({
				username: "test",
				password: "salah",
			}),
		});

		expect(response.status).toBe(401);

		const body = await response.json();
		expect(body.errors).toBeDefined();
	});
});

describe("GET /api/users/current", () => {
	beforeEach(async () => {
		await UserTest.create();
	});

	afterEach(async () => {
		await UserTest.delete();
	});

	it("should be able to get user", async () => {
		const response = await app.request("/api/users/current", {
			method: "get",
			headers: {
				Authorization: "test",
			},
		});

		expect(response.status).toBe(200);

		const body = await response.json();
		expect(body.data).toBeDefined();
		expect(body.data.username).toBe("test");
		expect(body.data.name).toBe("test");
	});

	it("should not be able to get user if token is invalid", async () => {
		const response = await app.request("/api/users/current", {
			method: "get",
			headers: {
				Authorization: "salah",
			},
		});

		expect(response.status).toBe(401);

		const body = await response.json();
		expect(body.errors).toBeDefined();
	});

	it("should not be able to get user if there is no Authorization header", async () => {
		const response = await app.request("/api/users/current", {
			method: "get",
		});

		expect(response.status).toBe(401);

		const body = await response.json();
		expect(body.errors).toBeDefined();
	});
});

describe("PATCH /api/users/current", () => {
	beforeEach(async () => {
		await UserTest.create();
	});

	afterEach(async () => {
		await UserTest.delete();
	});

	it("should reject update user if request is invalid", async () => {
		const response = await app.request("/api/users/current", {
			method: "PATCH",
			headers: {
				Authorization: "test",
			},
			body: JSON.stringify({
				username: "",
				password: "",
				name: "",
			}),
		});

		const body = await response.json();

		expect(response.status).toBe(400);
		expect(body.errors).toBeDefined();
	});

	it("should reject update user if request header is invalid", async () => {
		const response = await app.request("/api/users/current", {
			method: "PATCH",
			headers: {
				Authorization: "salah",
			},
			body: JSON.stringify({
				password: "passbaru",
			}),
		});

		const body = await response.json();

		expect(response.status).toBe(401);
		expect(body.errors).toBeDefined();
	});

	it("should able update name", async () => {
		const response = await app.request("/api/users/current", {
			method: "PATCH",
			headers: {
				Authorization: "test",
			},
			body: JSON.stringify({
				name: "testi",
			}),
		});

		const body = await response.json();

		expect(response.status).toBe(200);
		expect(body.data).toBeDefined();
		expect(body.data.name).toBe("testi");
	});

	it("should able update password", async () => {
		let response = await app.request("/api/users/current", {
			method: "PATCH",
			headers: {
				Authorization: "test",
			},
			body: JSON.stringify({
				password: "baru",
			}),
		});

		expect(response.status).toBe(200);

		const body = await response.json();

		expect(body.data).toBeDefined();
		expect(body.data.name).toBe("test");

		response = await app.request("/api/users/login", {
			method: "POST",
			body: JSON.stringify({
				username: "test",
				password: "baru",
			}),
		});

		expect(response.status).toBe(200);
	});
});
