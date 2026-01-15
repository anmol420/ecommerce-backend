import { getPool } from "../../db/db";
import {
  GetUserByEmailDTO,
  GetUserByPhoneNumberDTO,
  RegisterUserDTO,
} from "../../types/dtos/auth/auth.dto";
import { RegisterUserResponse } from "../../types/responses/auth/auth.response";

export class UserRepository {
  static async createUser(
    data: RegisterUserDTO,
  ): Promise<RegisterUserResponse> {
    const result = await (
      await getPool()
    ).query(
      `
      INSERT INTO users (email, password, first_name, last_name, gender, status, role, email_verified, phone_number)
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9) RETURNING (id, email)
      `,
      [
        data.email,
        data.password,
        data.firstName,
        data.lastName,
        data.gender,
        data.status,
        data.role,
        data.emailVerified,
        data.phoneNumber,
      ],
    );
    const res = result.rows[0];
    return {
      id: res.id,
      email: res.email,
    };
  }
  static async getUserExistsByEmail(data: GetUserByEmailDTO): Promise<boolean> {
    const result = await (
      await getPool()
    ).query(
      `
      SELECT id FROM users WHERE email = $1
    `,
      [data.email],
    );
    if (result.rows.length === 0) {
      return true;
    }
    return false;
  }
  static async getUserExistsByPhoneNumber(
    data: GetUserByPhoneNumberDTO,
  ): Promise<boolean> {
    const result = await (
      await getPool()
    ).query(
      `
      SELECT id FROM users WHERE phone_number = $1
    `,
      [data.phoneNumber],
    );
    if (result.rows.length === 0) {
      return true;
    }
    return false;
  }
}
