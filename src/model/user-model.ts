import { User } from "../generated/prisma"

export type RegisterUserRequest = {
    name: string,
    username: string,
    password: string
}

export type LoginUserRequest = {
    username: string,
    password: string
}

export type UpdateUserRequest = {
    name?: string,
    password?: string
}

export type UserResponse = {
    username: string,
    name: string
    token?: string
}

export function toUserResponse(user: User): UserResponse {
    return {
        username: user.username,
        name: user.name
    }
}