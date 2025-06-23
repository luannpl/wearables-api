import { prisma } from "../../prisma/client";
import { CreateUserDto } from "./dto/createUser.schema";

export const UserRepository = {
    async findByEmail(email: string) {
        try {
            const user = await prisma.user.findUnique({
                where: { email },
            });
            return user;
        } catch (error: any) {
            throw new Error(`Error finding user by email: ${error.message}`);
        }
    },

    async findByUsername(username: string) {
        try {
            const user = await prisma.user.findUnique({
                where: { username },
            });
            return user;
        } catch (error: any) {
            throw new Error(`Error finding user by username: ${error.message}`);
        }
    },
    async create(userData: CreateUserDto) {
        try {
            const user = await prisma.user.create({
                data: userData,
            });
            return user;
        } catch (error: any) {
            throw new Error(`Error creating user: ${error.message}`);
        }
    },


    async findAll(){
        try {
            const users = await prisma.user.findMany();
            return users;
        } catch (error: any) {
            throw new Error(`Error fetching users: ${error.message}`);
        }
    }
}