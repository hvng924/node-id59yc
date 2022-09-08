const bcrypt = require('bcryptjs');
import { Request, Response } from 'express';
import { exist } from 'joi';
import { ErrorCodes, MEMORY_DB } from '../constanst';
import { SALT_ROUNDS, STATUS_CODE } from '../constanst';
import { UserDto, userLoginSchema, userRegisterSchema } from './auth.dto';
import { UserEntry } from './auth.schema';
import { getUserByUsername } from './auth.service';


module.exports.register = (req: Request, res: Response) => {
  const { value: registerUser, error }: {value: UserDto, error: any} = userRegisterSchema.validate(req.body);  
  if (error) {
    return res.status(STATUS_CODE.BAD_REQUEST).json({
      error: ErrorCodes.INVALID_INPUT,
      message: error.message
    });
  }

  // Check if user already exists
  const user = getUserByUsername(registerUser.username);
  
  if (user) {
    return res.status(STATUS_CODE.BAD_REQUEST).json({
      error: ErrorCodes.USER_EXISTS,
      message: 'User already exists',
    });
  }
  
  const salt = bcrypt.genSaltSync(SALT_ROUNDS);
  const passwordHash = bcrypt.hashSync(registerUser.password, salt);
  const userEntry: UserEntry = {
    email: registerUser.email,
    type: registerUser.type,
    salt,
    passwordhash: passwordHash,
  };
  MEMORY_DB[registerUser.username] = userEntry;
  
  return res.status(STATUS_CODE.CREATED).json({ message: 'User created' });
}

module.exports.login = (req: Request, res: Response) => {
  const { value: loginUser, error }: {value: UserDto, error: any} = userLoginSchema.validate(req.body);
  
  if (error) {
    return res.status(STATUS_CODE.BAD_REQUEST).json({
      error: ErrorCodes.INVALID_INPUT,
      message: error.message 
    });
  }
  // Check if user already exists
  const user = getUserByUsername(loginUser.username);
  
  if (!user) {
    return res.status(STATUS_CODE.BAD_REQUEST).json({
      error: ErrorCodes.INVALID_USER,
      message: "User doesn't exist"
    });
  }
  
  const passwordHash = bcrypt.hashSync(loginUser.password, user.salt);
  
  if (passwordHash !== user.passwordhash) {
    return res.status(STATUS_CODE.BAD_REQUEST).json({
      error: ErrorCodes.INCORRECT_PASSWORD,
      message: 'Password is incorrect'
    });
  }
  return res.status(STATUS_CODE.OK).json({ message: 'User logged in' });
}