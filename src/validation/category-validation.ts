import { ObjectId } from "mongodb";
import { z, ZodType } from "zod";

export class CategoryValidation {
	static readonly CREATE: ZodType = z.object({
		name: z.string().min(1).max(50),
		type: z.enum(["INCOME", "EXPENSE"]),
	});

	static readonly GET: ZodType = z
		.string()
		.refine((val) => ObjectId.isValid(val), {
			message: "Invalid ObjectId",
		});

	static readonly UPDATE: ZodType = z.object({
		name: z.string().min(1),
		type: z.enum(["INCOME", "EXPENSE"])
	})
}
