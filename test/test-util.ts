import { prisma } from "../src/application/database";

export class UserTest {
	static async create() {
		await prisma.user.create({
			data: {
				username: "test",
				name: "test",
				password: await Bun.password.hash("test", {
					algorithm: "bcrypt",
					cost: 10,
				}),
				token: "test",
			},
		});
	}

	static async delete() {
		await prisma.user.deleteMany({
			where: {
				username: "test",
			},
		});
	}
}

export class CategoryTest {
	static async delete() {
		await prisma.category.deleteMany({
			where: {
				username: "test",
			},
		});
	}

	static async create() {
		await prisma.category.create({
			data: {
				id: "66598f2d3f4b6e2a9c6e7f42",
				username: "test",
				name: "Transportasi",
				type: "EXPENSE",
			},
		});
	}

	static async createMany(n: number) {
		for (let i = 0; i < n; i++) {
			await prisma.category.create({
				data: {
					username: "test",
					name: `Transportasi ${i}`,
					type: "EXPENSE",
				},
			});
		}
	}
}

export class TransactionTest {
	static async delete() {
		await prisma.transaction.deleteMany({
			where: {
				username: "test",
			},
		});
	}
}