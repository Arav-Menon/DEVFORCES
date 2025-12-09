import type { Request, Response, NextFunction } from "express";

export const authorizeRole = (...allowRoles: any) => {
  return (req: Request, res: Response, next: NextFunction) => {
    //@ts-ignore
    const userRole = req.user.role;

    if (!allowRoles.includes(userRole)) {
      return res.status(403).json({ message: "Access denied" });
    }

    next();
  };
};
