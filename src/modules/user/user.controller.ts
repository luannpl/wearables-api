import { Request, Response } from "express";
import { UserService } from "./user.service";
import { HttpError } from "../../errors/HttpErrors";

export const UserController = {
  async createUser(req: Request, res: Response): Promise<void> {
    try {
      const user = await UserService.createUser(
        req.body,
        req.file as Express.Multer.File | undefined
      );
      res.status(201).json(user);
    } catch (error: any) {
      if (error instanceof HttpError) {
        res.status(error.status).json({ error: error.message });
        return;
      }
      res.status(500).json({ error: error.message || "Internal Server Error" });
    }
  },

  async login(req: Request, res: Response): Promise<void> {
    try {
      const user = await UserService.login(req.body);
      res.status(200).json(user);
    } catch (error) {
      if (error instanceof HttpError) {
        res.status(error.status).json({ error: error.message });
        return;
      }
      res.status(500).json({ error: "Internal Server Error" });
    }
  },

  async getCurrentUser(req: Request, res: Response): Promise<void> {
    try {
      if (!req.user) {
        res.status(401).json({ error: "Unauthorized" });
        return;
      }
      const user = await UserService.getCurrentUser(req.user.id);
      res.status(200).json(user);
    } catch (error) {
      if (error instanceof HttpError) {
        res.status(error.status).json({ error: error.message });
        return;
      }
      res.status(500).json({ error: "Internal Server Error" });
    }
  },

  async getAllUsers(_: Request, res: Response): Promise<void> {
    try {
      const users = await UserService.getAllUsers();
      res.status(200).json(users);
    } catch (error) {
      if (error instanceof HttpError) {
        res.status(error.status).json({ error: error.message });
        return;
      }
      res.status(500).json({ error: "Internal Server Error" });
    }
  },

  async getUserById(req: Request, res: Response): Promise<void> {
    try{
      const user = await UserService.getUserById(req.params.id);
      res.status(200).json(user);
    } catch (error) {
      if (error instanceof HttpError) {
        res.status(error.status).json({ error: error.message });
        return;
      }
      res.status(500).json({ error: "Internal Server Error" });
    }
  },

  async updateUser(req: Request, res: Response): Promise<void> {
    try {
      const updatedUser = await UserService.updateUser(
        req.params.id,
        req.body,
        req.file as Express.Multer.File | undefined
      );
      res.status(200).json(updatedUser);
    } catch (error) {
      if (error instanceof HttpError) {
        res.status(error.status).json({ error: error.message });
        return;
      }
      res.status(500).json({ error: "Internal Server Error" });
    }
  },

  async deleteUser(req: Request, res: Response): Promise<void> {
    try {
      await UserService.deleteUser(req.params.id);
      res.status(204).send();
    } catch (error) {
      if (error instanceof HttpError) {
        res.status(error.status).json({ error: error.message });
        return;
      }
      res.status(500).json({ error: "Internal Server Error" });
    }
  },
};
