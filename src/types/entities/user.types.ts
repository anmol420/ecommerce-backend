export interface User {
  id: string;
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  phoneNumber: string;
  gender: "male" | "female" | "other" | "prefer_not_to_say";
  status: "active" | "suspended" | "deleted";
  role: "customer" | "vendor" | "admin";
  emailVerified: boolean;
  createdAt: Date;
  updatedAt: Date;
  lastLoginAt?: Date;
}
