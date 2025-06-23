import { CreateUserDto } from "./dto/createUser.schema";
import { UserRepository } from "./user.repository";
import { comparePassword, hashPassword } from "../../utils/hash";
import { BadRequestError, UnauthorizedError } from "../../errors/HttpErrors";
import { LoginDto } from "./dto/login.schema";

export const UserService = {
    async createUser(userData: CreateUserDto) {
        const existingUser = await UserRepository.findByEmail(userData.email);
        if (existingUser) {
            throw new BadRequestError("Email already registered");
        }
        const existingUsername = await UserRepository.findByUsername(userData.username);
        if (existingUsername) {
            throw new BadRequestError("Username already registered");
        }
        userData.password = await hashPassword(userData.password)
        const user = await UserRepository.create(userData);
        if (!user) {
            throw new BadRequestError("Error creating user");
        }
        const { password, ...userWithoutPassword } = user;
        return userWithoutPassword;
    },

    async login(userData: LoginDto) {
        const user = await UserRepository.findByEmail(userData.email);
        if (!user) {
            throw new UnauthorizedError("Invalid credentials")
        }
        const isPasswordValid = await comparePassword(userData.password, user.password);
        if (!isPasswordValid) {
            throw new UnauthorizedError("Invalid credentials");
        }
        const { password, ...userWithoutPassword } = user;
        return {
            message: "Login successful",
            user: userWithoutPassword
        }
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