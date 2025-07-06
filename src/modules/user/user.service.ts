import { UserRepository } from "./user.repository";
import { comparePassword, hashPassword } from "../../utils/hash";
import { BadRequestError, UnauthorizedError } from "../../errors/HttpErrors";
import { generateToken } from "../../utils/generateToken";
import { CreateUserDto } from "./dto/createUser.dto";
import { LoginDto } from "./dto/login.dto";
import pinata from "../../lib/pinata";
import { Readable } from "stream";

export const UserService = {
  async createUser(userData: CreateUserDto, file?: Express.Multer.File) {
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

    if (file) {
      const stream = Readable.from(file.buffer);
      const metadata = {
        name: `avatar-${userData.username}-${Date.now()}-${file.originalname}`,
      };

      const result = await pinata.pinFileToIPFS(stream, {
        pinataMetadata: metadata,
      });

      if (!result || !result.IpfsHash) {
        throw new BadRequestError("Error uploading avatar to IPFS");
      }

      userData.avatarUrl = `https://gateway.pinata.cloud/ipfs/${result.IpfsHash}`;
    }

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

  async getCurrentUser(id: string) {
    const user = await UserRepository.findById(id);
    if (!user) {
      throw new BadRequestError("User not found");
    }
    const { password, ...userWithoutPassword } = user;
    return userWithoutPassword;
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

  async updateUser(
    id: string,
    userData: CreateUserDto,
    file?: Express.Multer.File
  ) {
    const user = await UserRepository.findById(id);
    if (!user) {
      throw new BadRequestError("User not found");
    }
    if (userData.email) {
      const existingEmail = await UserRepository.findByEmail(userData.email);
      if (existingEmail && existingEmail.id !== id) {
        throw new BadRequestError("Email already registered");
      }
    }
    if (userData.password) {
      userData.password = await hashPassword(userData.password);
    }
    if (userData.username) {
      const existingUsername = await UserRepository.findByUsername(
        userData.username
      );
      if (existingUsername && existingUsername.id !== id) {
        throw new BadRequestError("Username already registered");
      }
    }
    if (file) {
      const stream = Readable.from(file.buffer);
      const metadata = {
        name: `avatar-${userData.username}-${Date.now()}-${file.originalname}`,
      };

      const result = await pinata.pinFileToIPFS(stream, {
        pinataMetadata: metadata,
      });

      if (!result || !result.IpfsHash) {
        throw new BadRequestError("Error uploading avatar to IPFS");
      }

      userData.avatarUrl = `https://gateway.pinata.cloud/ipfs/${result.IpfsHash}`;
    }
    const updatedUser = await UserRepository.update(id, userData);
    if (!updatedUser) {
      throw new BadRequestError("Error updating user");
    }
    const { password, ...userWithoutPassword } = updatedUser;
    return userWithoutPassword;
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
