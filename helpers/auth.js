import { hash, compare } from "bcryptjs";

export async function hashPassword(password) {
  //On utilise la fonction hash de bcryptjs avec la valeur de 12
  return await hash(password, 12);
}

export async function verifyPassword(password, hashedPassword) {
  return await compare(password, hashedPassword);
}
