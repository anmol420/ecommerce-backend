import { Context, MiddlewareHandler } from "hono";
import * as z from "zod";
import { ErrorHandler } from "../types/responses/error/error.response";

export const requestValidator = (schema: z.ZodType): MiddlewareHandler => {
  return async (c: Context, next: Function) => {
    const text = await c.req.text();
    let body;
    try {
      body = JSON.parse(text);
    } catch (error) {
      return c.json(ErrorHandler.badRequestHandler("Invalid JSON"), 400);
    }
    const result = schema.safeParse(body);
    if (!result.success) {
      return c.json(
        ErrorHandler.badRequestHandler(
          "ZOD Validation Error",
          result.error.message,
        ),
        400,
      );
    }
    c.set("validatedBody", result.data);
    await next();
  };
};
