import express from "express";
import { openai } from "../lib/openaisdk";
import { Request, Response, NextFunction } from "express";

const router = express.Router();

router.post(
  "/translation",
  (req: Request, res: Response, next: NextFunction) => {
    try {
    } catch (err) {}
  }
);

export { router as code };
