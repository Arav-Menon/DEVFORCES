import "express";

declare global {
  namespace Express {
    interface Request {
      id?: string;
      user?: {
        id: string;
      };
    }
  }
}
