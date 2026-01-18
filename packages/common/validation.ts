import { z } from "zod";

export const userSchema = z.object({
  username: z
    .string()
    .min(3, "Username must be at least 3 characters long")
    .max(20, "Username cannot exceed 20 characters")
    .optional(),
  email: z.string().email("Invalid email address"),
  password: z
    .string()
    .min(8, "Password must be at least 8 characters long")
    .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
    .regex(/[0-9]/, "Password must contain at least one number"),
});

export const contestSchema = z.object({
  title: z.string().trim().min(5).max(100),
  startTime: z.coerce.date().refine((d) => d.getTime() > Date.now(), {
    message: "Start time must be in the future",
  }),
  slug: z.string(),
});

export const challengeSchema = z.object({
  title: z.string().trim().min(5).max(100),
  slug: z.string(),
  description: z.string(),
  requirements: z.string(),
  constraints: z.string(),
  example: z.json(),
  allowedLanguages: z.array(z.string()),
  maxPoint: z.number().min(10).max(100),
  startAt: z.coerce.date().refine((d) => d.getTime() > Date.now(), {
    message: "Start time must be in the future",
  }),
  endAt: z.coerce.date().refine((d) => d.getTime() < Date.now(), {
    message: "end time must be in the future",
  }),
  evaluationConfig: z.json(),
  difficulty: z.enum(["EASY", "MEDIUM", "HARD"]),
});

export const adminAuthSchema = z.object({
  username: z
    .string()
    .min(3, "Username must be at least 3 characters long")
    .max(20, "Username cannot exceed 20 characters")
    .optional(),
  email: z.string().email("Invalid email address"),
  password: z
    .string()
    .min(8, "Password must be at least 8 characters long")
    .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
    .regex(/[0-9]/, "Password must contain at least one number"),
});

export const updateUserRoleSchema = z.object({
  userId: z.string().uuid("Invalid user ID format"),
  role: z.enum(["CREATOR"], {
    message: "Role must be CREATOR",
  }),
});

export const adminUserSchema = z.object({
  username: z
    .string()
    .min(3, "Username must be at least 3 characters long")
    .max(20, "Username cannot exceed 20 characters")
    .optional(),
});

export const blockUserSchema = z.object({
  userId: z.string().uuid("Invalid user ID format"),
});

