import { jwt_secret_key } from "@/config";
import { compare, genSalt, hash } from "bcrypt";
import { sign, verify } from "jsonwebtoken";
import { IUser } from "./mongoose/User";

export async function saltAndHashPassword(password: string) {
  const salt = await genSalt(10);
  const hashedPassword = await hash(password, salt);
  return hashedPassword;
}

export async function verifyPassword(user: IUser, password: string) {
  const valid = await compare(password, user.password);
  return valid;
}

export function createJWTFromUser(user: IUser) {
  return sign({
    sub: user.email,
    name: user.screenname,
    iat: Date.now(),
    ttl: 7200000
  }, jwt_secret_key)
}

export function validateJWT(jwt: string) {
  try {
    const token = verify(jwt, jwt_secret_key);
    
    if (typeof token == 'string')
      return false;

    if (token.iat + token.ttl < Date.now())
      return false;

    return token as NewtToken;
  } catch (_) {
    return false;
  }
}