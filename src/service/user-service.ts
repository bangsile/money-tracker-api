import { prisma } from "../application/database";
import { LoginUserRequest, RegisterUserRequest, toUserResponse, UserResponse } from "../model/user-model";
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

    static async login(request: LoginUserRequest): Promise<UserResponse> {
        request = UserValidation.LOGIN.parse(request)

        let user = await prisma.user.findUnique({
            where: {
                username: request.username
            }
        })

        if (!user) {
            throw new HTTPException(401, {
                message: "Username or password is wrong"
            })
        }

        const isPasswordMatch = await Bun.password.verify( request.password,user.password, "bcrypt")

        if (!isPasswordMatch) {
            throw new HTTPException(401, {
                message: "Username or password is wrong"
            })
        } 

        user = await prisma.user.update({
            where: {
                id: user.id
            },
            data: {
                token: crypto.randomUUID()
            }
        })

        const response = toUserResponse(user)
        response.token = user.token!

        return response

    }

    static async get(token: string | undefined | null): Promise<UserResponse> {
        const result = UserValidation.TOKEN.safeParse(token)

        if (result.error) {
            throw new HTTPException(401, {
                message: "Unauthorized"
            })
        }

        token = result.data

        const user = await prisma.user.findFirst({
            where: {
                token: token
            }
        })

        if (!user) {
            throw new HTTPException(401, {
                message: "Unauthorized"
            })
        }

        return toUserResponse(user)
    }
}