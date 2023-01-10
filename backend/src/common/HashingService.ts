import bcrypt from 'bcryptjs'

export const hashPassword = async (password: string) => bcrypt.hash(password, await bcrypt.genSalt(10))

export const validatePassword = async (passwordReceived: string, password: string) =>
  bcrypt.compare(passwordReceived, password)
