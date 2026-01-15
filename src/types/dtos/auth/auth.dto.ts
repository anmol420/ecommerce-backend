export interface RegisterUserDTO {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  phoneNumber: string;
  gender: string;
  status: string;
  role: string;
  emailVerified: boolean;
}

export interface GetUserByEmailDTO {
  email: string;
}

export interface GetUserByPhoneNumberDTO {
  phoneNumber: string;
}

export interface LoginUserDTO {
  email: string;
  password: string;
}
