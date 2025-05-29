import { prisma } from "../application/database";
import { RegisterUserRequest, toUserResponse, UserResponse } from "../model/user-model";
import { UserValidation } from "../validation/user-validation";
import {HTTPException} from "hono/http-exception";


export class UserService {
    
    static async register(request: RegisterUserRequest): Promise<UserResponse> {
        request = UserValidation.REGISTER.parse(request)

        const usernameExist = await prisma.user.count({
            where: {
                username: request.username
            }
        })

        if (usernameExist > 0) {
            throw new HTTPException(400, {
                message: "Username already exists"
            })
        }

        request.password = await Bun.password.hash(request.password, {
            algorithm: "bcrypt",
            cost: 12
        })

        const user = await prisma.user.create({
            data: request
        })

        return toUserResponse(user)
    }
}