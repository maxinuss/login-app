import { log, LOG_TYPE_ERROR } from "../common/LogService"
import { User } from "../model/User"
import { v4 as uuid } from 'uuid'
import { hashPassword, validatePassword } from "../common/HashingService";
import UserDto from "../dto/UserDto";

export interface CreateUserParamsInterface {
  name: string,
  lastName: string,
  email: string,
  password: string,
}

export interface LoginUserInterface {
  email: string,
  password: string,
}


export const createUser = async ({ name, lastName, email, password}: CreateUserParamsInterface) => {
  try {
    const encryptedPassword = await hashPassword(password)
    const user = await User.create({ name, lastName, email, password: encryptedPassword, id: uuid() })
    const response = new UserDto(user) || {};

    return { ...response }
  } catch (err) {
    log(LOG_TYPE_ERROR, 'createUser', err)

    return {}
  }
}

export const userIsValid = async (params: LoginUserInterface) => {
  try {
    const user = await User.findOne({ where: { email: params.email } })
    if (!user || !await validatePassword(params.password, user.password)) return { isValid: false };

    return { id: user.id, isValid: true }
  } catch (err) {
    log(LOG_TYPE_ERROR, 'validateUser', err)
    return { isValid: false }
  }
}

export const getUserData = async (userId: number) => {
  try {
    const user = await User.findByPk(userId)
    const userDto = new UserDto(user)

    return { ...userDto, isValid: true }
  } catch (err) {
    log(LOG_TYPE_ERROR, 'validateUser', err)
    return { isValid: false }
  }
}