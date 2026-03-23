import { ZodError, ZodType } from "zod";
import { Request, Response, NextFunction } from "express";

export const validate =
  <T>(schema: ZodType<T>, source: "body" | "query" = "body") =>
  async (
    req: Request & { validated?: T },
    res: Response,
    next: NextFunction,
  ) => {
    try {
      const parsed = await schema.parseAsync(req[source]);
      req.validated = parsed;
      next();
    } catch (error) {
      if (error instanceof ZodError) {
        const fieldErrors = error.issues.reduce(
          (acc, issue) => {
            const key = issue.path.join(".");
            if (!acc[key]) acc[key] = [];
            acc[key].push(issue.message);
            return acc;
          },
          {} as Record<string, string[]>,
        );

        return res.status(400).json({
          error: "Validation failed",
          details: fieldErrors,
        });
      }

      return res.status(500).json({
        error: "Internal server error",
      });
    }
  };
