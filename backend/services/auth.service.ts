import jwt from 'jsonwebtoken';
import { userRepository } from "../repository/UserRepository.js";
import { z } from "zod";
import { loginSchema } from "../schemas/auth.schema.js";

type LoginCredentials = z.infer<typeof loginSchema>;

export const authService = {
    register: async (userData: any) => {
        const emailExists = await userRepository.findByEmail(userData.email);
        if (emailExists ) {
            throw new Error("E-mail já cadastrado");
        }

        const newUser = {
            ...userData,
            role: 'CITIZEN' as const
        }

        return await userRepository.create(newUser)
    },

    login: async (credentials: LoginCredentials) => {
        const user = await userRepository.findByEmail(credentials.email);
        
        if (!user || user.password !== credentials.password) {
            throw new Error("Credenciais inválidas");
        }

        const secret = process.env.JWT_SECRET || 'your-default-secret';
        
        const token = jwt.sign(
            { 
                userId: user.id, 
                role: user.role,
                name: user.name,
                email: user.email
            }, 
            secret, 
            { expiresIn: '6hr' }
        );

        const { password, ...userWithoutPassword } = user;
        return { user: userWithoutPassword, token };
    }
}