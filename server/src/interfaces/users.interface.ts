export interface User {
  _id: string;
  email: string;
  password: string;
  identity: string;
}

export interface CreateUserDTO {
  email: string;
  password: string;
}
