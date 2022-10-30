export interface User {
  _id: string;
  email: string;
  password: string;
  x509Identity: string;
}

export interface CreateUserDTO {
  email: string;
  password: string;
  fullname: string;
  dob: string;
  username: string;
}
