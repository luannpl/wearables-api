import { Request, Response } from "express";
import { UserService } from "./user.service";
import { HttpError } from "../../errors/HttpErrors";

export const UserController = {
    async createUser(req: Request, res: Response) {
        try {
            const user = await UserService.createUser(req.body);
            res.status(201).json(user);
        } catch (error) {
            if (error instanceof HttpError) {
                return res.status(error.status).json({ error: error.message });
            }
            return res.status(500).json({ error: "Internal Server Error" });
        }
    },
    async getAllUsers(_: Request, res: Response) {
        try {
            const users = await UserService.getAllUsers();
            res.status(200).json(users);
        } catch (error) {
            if (error instanceof HttpError) {
                return res.status(error.status).json({ error: error.message });
            }
            return res.status(500).json({ error: "Internal Server Error" });
        }
    },

}