import { CreateUserDto } from "./dto/createUser.schema";
import { UserRepository } from "./user.repository";
import { hashPassword } from "../../utils/hash";
import { BadRequestError } from "../../errors/HttpErrors";

export const UserService = {
    async createUser(userData: CreateUserDto) {
        const existingUser = await UserRepository.findByEmail(userData.email);
        if (existingUser) {
            throw new BadRequestError("Email already registered");
        }
        userData.password = await hashPassword(userData.password)
        const user = await UserRepository.create(userData);
        if (!user) {
            throw new BadRequestError("Error creating user");
        }
        const { password, ...userWithoutPassword } = user;
        return userWithoutPassword;
    },

    async getAllUsers() {
        try {
            const users = await UserRepository.findAll();
            return users;
        } catch (error: any) {
            throw new Error(`Error fetching users: ${error.message}`);
        }
    }
}