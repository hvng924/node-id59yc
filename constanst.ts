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
  user1: {email: "test1@gmail.com", type: "user", salt: "", passwordhash: ""}
};
