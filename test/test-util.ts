import { prisma } from "../src/application/database";

export class UserTest {

    static async create() {
        await prisma.user.create({
            data: {
                username: "test",
                name: "test",
                password: await Bun.password.hash("test", {
                    algorithm: "bcrypt",
                    cost: 10
                }),
                token: "test"
            }
        })
    }

    static async delete() {
        await prisma.user.deleteMany({
            where: {
                username: "test"
            }
        })
    }

}