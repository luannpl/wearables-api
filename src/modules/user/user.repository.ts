import { prisma } from "../../prisma/client";
import { CreateUserDto } from "./dto/createUser.dto";
import { UpdateUserDto } from "./dto/updateUser.dto";

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

  async findById(id: string) {
    try {
      const user = await prisma.user.findUnique({
        where: { id },
      });
      return user;
    } catch (error: any) {
      throw new Error(`Error finding user by ID: ${error.message}`);
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

  async findAll() {
    try {
      const users = await prisma.user.findMany();
      return users;
    } catch (error: any) {
      throw new Error(`Error fetching users: ${error.message}`);
    }
  },

  async update(id: string, userData: UpdateUserDto) {
    try {
      const user = await prisma.user.update({
        where: { id },
        data: userData,
      });
      return user;
    } catch (error: any) {
      throw new Error(`Error updating user: ${error.message}`);
    }
  },

  async delete(id: string) {
    try {
      const user = await prisma.user.delete({
        where: { id },
      });
      return user;
    } catch (error: any) {
      throw new Error(`Error deleting user: ${error.message}`);
    }
  },
};
