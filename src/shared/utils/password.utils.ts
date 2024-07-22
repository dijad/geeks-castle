// src/shared/utils/password.utils.ts

import * as bcrypt from 'bcrypt';

export function generateSecurePassword(length: number = 16): string {
  const uppercaseChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  const lowercaseChars = 'abcdefghijklmnopqrstuvwxyz';
  const numberChars = '0123456789';
  const specialChars = '!@#$%^&*()_+{}[]|:;<>,.?~';

  const allChars = uppercaseChars + lowercaseChars + numberChars + specialChars;

  let password = '';

  // Asegurarse de que la contraseña tenga al menos un carácter de cada tipo
  password += uppercaseChars[Math.floor(Math.random() * uppercaseChars.length)];
  password += lowercaseChars[Math.floor(Math.random() * lowercaseChars.length)];
  password += numberChars[Math.floor(Math.random() * numberChars.length)];
  password += specialChars[Math.floor(Math.random() * specialChars.length)];

  // Llenar el resto de la contraseña con caracteres aleatorios
  for (let i = password.length; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * allChars.length);
    password += allChars[randomIndex];
  }

  // Mezclar los caracteres de la contraseña
  return password.split('').sort(() => Math.random() - 0.5).join('');
}

/**
 * Hashea una contraseña usando bcrypt.
 * @param password La contraseña en texto plano a hashear.
 * @param saltRounds El número de rondas de salt (por defecto 10).
 * @returns Una promesa que resuelve con el hash de la contraseña.
 */
export async function hashPassword(password: string, saltRounds: number = 10): Promise<string> {
  try {
    const salt = await bcrypt.genSalt(saltRounds);
    const hash = await bcrypt.hash(password, salt);
    return hash;
  } catch (error) {
    console.error('Error hashing password:', error);
    throw new Error('Failed to hash password');
  }
}

/**
 * Compara una contraseña en texto plano con un hash.
 * @param password La contraseña en texto plano a comparar.
 * @param hash El hash con el que comparar la contraseña.
 * @returns Una promesa que resuelve con true si la contraseña coincide, false en caso contrario.
 */
export async function comparePasswords(password: string, hash: string): Promise<boolean> {
  try {
    const match = await bcrypt.compare(password, hash);
    return match;
  } catch (error) {
    console.error('Error comparing passwords:', error);
    throw new Error('Failed to compare passwords');
  }
}