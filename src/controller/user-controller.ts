import { Hono } from "hono";
import {
	LoginUserRequest,
	RegisterUserRequest,
	toUserResponse,
} from "../model/user-model";
import { UserService } from "../service/user-service";
import { User } from "../generated/prisma";
import { authMiddleware } from "../middleware/auth-middleware";
import { ApplicationVariables } from "../model/app-model";

export const userController = new Hono<{Variables: ApplicationVariables}>();

userController.post("/api/users", async (c) => {
	const request = (await c.req.json()) as RegisterUserRequest;

	const response = await UserService.register(request);

	return c.json({
		data: response,
	});
});

userController.post("/api/users/login", async (c) => {
	const request = (await c.req.json()) as LoginUserRequest;

	const response = await UserService.login(request);

	return c.json({
		data: response,
	});
});

userController.use(authMiddleware);

userController.get("/api/users/current", async (c) => {
	const user = c.get("user") as User;

	return c.json({
		data: toUserResponse(user),
	});
});
