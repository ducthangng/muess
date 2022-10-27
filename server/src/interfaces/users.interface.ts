export interface User {
  _id: string;
  email: string;
  password: string;
  userType: string;
}

export interface CreateUserDTO {
  email: string;
  password: string;
  userType: string;
}
