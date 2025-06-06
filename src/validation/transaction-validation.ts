import { ObjectId } from "mongodb";
import { z, ZodType } from "zod";

export class TransactionValidation {
	static readonly CREATE: ZodType = z.object({
		categoryId: z.string().refine((val) => ObjectId.isValid(val), {
			message: "Invalid ObjectId",
		}),
        amount: z.number().min(1),
        description: z.string().min(1).optional(),
        date: z.string().refine((val) => !isNaN(Date.parse(val)), {
            message: "Invalid date format"
        })
	});

    static readonly GET: ZodType = z
		.string()
		.refine((val) => ObjectId.isValid(val), {
			message: "Invalid ObjectId",
		})

    static readonly UPDATE: ZodType = z.object({
        amount: z.number().min(1),
        description: z.string().min(1).optional(),
        date: z.string().refine((val) => !isNaN(Date.parse(val)), {
            message: "Invalid date format"
        })
	});

    static readonly LIST: ZodType = z.object({
        type: z.string().min(1).optional(),
        start: z.string().refine((val) => !isNaN(Date.parse(val)), {
            message: "Invalid date format"
            }).optional(),
        end: z.string().refine((val) => !isNaN(Date.parse(val)), {
            message: "Invalid date format"
            }).optional(),
        page: z.number().min(1).positive(),
        size: z.number().min(1).max(100).positive()
    })
}
