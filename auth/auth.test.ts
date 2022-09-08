import {describe, expect, test} from '@jest/globals';
import { MEMORY_DB } from '../constanst';
import { getUserByEmail, getUserByUsername } from "./auth.service";


// generate test cases
describe("auth services", () => {

  it("should return user by username", () => {
    const user = getUserByUsername("test");
    expect(user).toEqual(MEMORY_DB.test);
  });

  it("should return undefined if user does not exist", () => {
    const user = getUserByUsername("test2");
    expect(user).toBeUndefined();
  });

  it("should return user by email", () => {
    const user = getUserByEmail("test@test.com");
    expect(user).toEqual(MEMORY_DB.test);
  });

  it("should return undefined if user does not exist", () => {
    const user = getUserByEmail("test2@test.com");
    expect(user).toBeUndefined();
  });
});