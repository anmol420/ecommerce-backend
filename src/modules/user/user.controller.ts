import { Context } from "hono";
import { ErrorHandler } from "../../types/responses/error/error.response";
import { UserService } from "./user.service";
import { RegisterUserDTO } from "../../types/dtos/auth/auth.dto";
import { UserRole, UserStatus } from "../../utils/enums";
import { RegisterUserResponse } from "../../types/responses/auth/auth.response";
import { Response } from "../../types/responses/response";

export class UserController {
  static async registerUser(c: Context) {
    const { email, password, firstName, lastName, gender, phoneNumber } =
      c.get("validatedBody");
    if (!email || !password || !firstName || !gender || !phoneNumber) {
      return c.json(
        ErrorHandler.notFoundHandler("Required fields missing"),
        404,
      );
    }
    try {
      const userEmailExists = await UserService.getUserExistsByEmail({ email });
      if (!userEmailExists) {
        return c.json(
          ErrorHandler.conflictHandler("Email already exists"),
          409,
        );
      }
      const userPhoneNumberExists =
        await UserService.getUserExistsByPhoneNumber({ phoneNumber });
      if (!userPhoneNumberExists) {
        return c.json(
          ErrorHandler.conflictHandler("Phone number already exists"),
          409,
        );
      }
      const hashedPassword = await UserService.hashPassword(password);
      const data: RegisterUserDTO = {
        email: email,
        password: hashedPassword,
        firstName: firstName,
        lastName: lastName ? lastName : "",
        phoneNumber: phoneNumber,
        gender: gender,
        emailVerified: false,
        role: UserRole.CUSTOMER,
        status: UserStatus.ACTIVE,
      };
      const user: RegisterUserResponse = await UserService.createUser(data);
      return c.json(
        Response.created("User registered successfully", user),
        201,
      );
    } catch (error: any) {
      return c.json(
        ErrorHandler.internalServerErrorHandler(
          "Internal server error",
          error.message,
        ),
        500,
      );
    }
  }
}
