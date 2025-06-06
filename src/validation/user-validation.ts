import { z, ZodType } from "zod";

export class UserValidation {
	static readonly REGISTER: ZodType = z.object({
		name: z.string().min(1).max(100),
		username: z.string().min(1).max(100),
		password: z.string().min(1).max(100),
	});

	static readonly LOGIN: ZodType = z.object({
		username: z.string().min(1),
		password: z.string().min(1),
	});

	static readonly TOKEN: ZodType = z.string().min(1);

	static readonly UPDATE: ZodType = z.object({
		name: z.string().min(1).max(100).optional(),
		username: z.string().min(1).max(100).optional(),
		password: z.string().min(1).max(100).optional(),
	});
}
