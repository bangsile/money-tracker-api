import { z, ZodType } from "zod";

export class UserValidation {

    static readonly REGISTER: ZodType = z.object({
        name: z.string().min(1).max(100),
        username: z.string().min(1).max(100),
        password: z.string().min(1).max(100)
    })
}