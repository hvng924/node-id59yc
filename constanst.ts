import { UserEntry } from "./auth/auth.schema";

export const SALT_ROUNDS: number = 10;
export const STATUS_CODE = {
  OK: 200,
  CREATED: 201,
  BAD_REQUEST: 400,
}
export const PASSWORD_PATTERN: RegExp = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{5,24}$/;
export const EMAIL_PATTERN: RegExp = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
// Database mock where the username is the primary key of a user.
export const MEMORY_DB: Record<string, UserEntry> = {
  test: {
    email: 'test@test.com',
    type: 'admin',
    salt: '$2a$10$LN7E3RutthKtAF6ZOc5rhe',
    passwordhash: '$2a$10$LN7E3RutthKtAF6ZOc5rheRcrka16JELKdmtCIcmreTR3JJVxZ7Hi'
  }
};

export enum ErrorCodes {
  INVALID_USER = "INVALID_USER",
  INVALID_INPUT = "INVALID_INPUT",
  INCORRECT_PASSWORD = 'INCORRECT_PASSWORD',
  USER_EXISTS = 'USER_EXISTS',
}