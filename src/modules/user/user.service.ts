import {
  GetUserByEmailDTO,
  GetUserByPhoneNumberDTO,
  RegisterUserDTO,
} from "../../types/dtos/auth/auth.dto";
import { RegisterUserResponse } from "../../types/responses/auth/auth.response";
import { UserRepository } from "./user.repository";

export class UserService {
  static async createUser(
    data: RegisterUserDTO,
  ): Promise<RegisterUserResponse> {
    return UserRepository.createUser(data);
  }
  static async getUserExistsByEmail(data: GetUserByEmailDTO): Promise<boolean> {
    return UserRepository.getUserExistsByEmail(data);
  }
  static async getUserExistsByPhoneNumber(
    data: GetUserByPhoneNumberDTO,
  ): Promise<boolean> {
    return UserRepository.getUserExistsByPhoneNumber(data);
  }
  static async hashPassword(password: string): Promise<string> {
    return Bun.password.hash(password, {
      algorithm: "bcrypt",
      cost: 10,
    });
  }
}
