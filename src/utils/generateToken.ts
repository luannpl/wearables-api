import jwt from 'jsonwebtoken';
import { User } from '@prisma/client';
import { BadRequestError } from '../errors/HttpErrors';

export const generateToken = (user: User): string => {
    if (!process.env.JWT_SECRET) {
        throw new BadRequestError("JWT_SECRET not set in environment variables");
    }
    const payload = {
        id: user.id,
        email: user.email,
        role: user.role,
    };

    const token = jwt.sign(payload, process.env.JWT_SECRET as string, {
        expiresIn: '8h',
    });

    return token;
}