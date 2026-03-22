import { Request } from "express";

export type ValidatedRequest<T> = Omit<Request, "body" | "query"> & {
  validated: T;
};
