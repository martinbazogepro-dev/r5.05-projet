import z from 'zod';

export const registerSchema = z.object({
    mail: z.email('Email invalide'),
    firstname: z.string().min(5).max(30),
    lastname: z.string().min(5).max(30),
    nickname: z.string().min(5).max(30),
    password: z.string().min(6).max(100),
})

export const loginSchema = z.object({
    email: z.email('Email invalide'),
    password: z.string().min(6).max(100),
})