import { CreateUserDto } from "./dto/createUser.schema";
import { UserRepository } from "./user.repository";
import { comparePassword, hashPassword } from "../../utils/hash";
import { BadRequestError, UnauthorizedError } from "../../errors/HttpErrors";
import { LoginDto } from "./dto/login.schema";
import { generateToken } from "../../utils/generateToken";

export const UserService = {
  async createUser(userData: CreateUserDto) {
    const existingUser = await UserRepository.findByEmail(userData.email);
    if (existingUser) {
      throw new BadRequestError("Email already registered");
    }
    const existingUsername = await UserRepository.findByUsername(
      userData.username
    );
    if (existingUsername) {
      throw new BadRequestError("Username already registered");
    }
    userData.password = await hashPassword(userData.password);
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
      throw new UnauthorizedError("Invalid credentials");
    }
    const isPasswordValid = await comparePassword(
      userData.password,
      user.password
    );
    if (!isPasswordValid) {
      throw new UnauthorizedError("Invalid credentials");
    }
    const token = await generateToken(user);
    if (!token) {
      throw new BadRequestError("Error generating token");
    }
    const { password, ...userWithoutPassword } = user;
    return {
      message: "Login successful",
      token,
      user: userWithoutPassword,
    };
  },

  async getAllUsers() {
    try {
      const users = await UserRepository.findAll();
      const usersWithoutPassword = users.map((user) => {
        const { password, ...userWithoutPassword } = user;
        return userWithoutPassword;
      });
      return usersWithoutPassword;
    } catch (error: any) {
      throw new Error(`Error fetching users: ${error.message}`);
    }
  },

  async deleteUser(id: string) {
    const user = await UserRepository.findById(id);
    if (!user) {
      throw new BadRequestError("User not found");
    }
    const deletedUser = await UserRepository.delete(id);
    if (!deletedUser) {
      throw new BadRequestError("Error deleting user");
    }
    return deletedUser;
  },
};
