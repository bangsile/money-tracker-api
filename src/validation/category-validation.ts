import { z, ZodType } from "zod";

export class CategoryValidation {

    static readonly CREATE: ZodType = z.object({
        username: z.string().min(1),
        name: z.string().min(1).max(50),
        type: z.enum(["INCOME", "EXPENSE"])
    })
}