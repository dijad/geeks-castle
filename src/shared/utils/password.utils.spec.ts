// src/shared/utils/password.utils.spec.ts
import { generateSecurePassword } from './password.utils';

describe('generateSecurePassword', () => {
  it('should generate a password of the specified length', () => {
    const length = 16;
    const password = generateSecurePassword(length);
    expect(password).toHaveLength(length);
  });

  it('should generate a password containing uppercase letters', () => {
    const password = generateSecurePassword();
    const hasUppercase = /[A-Z]/.test(password);
    expect(hasUppercase).toBe(true);
  });

  it('should generate a password containing lowercase letters', () => {
    const password = generateSecurePassword();
    const hasLowercase = /[a-z]/.test(password);
    expect(hasLowercase).toBe(true);
  });

  it('should generate a password containing numbers', () => {
    const password = generateSecurePassword();
    const hasNumbers = /[0-9]/.test(password);
    expect(hasNumbers).toBe(true);
  });

  it('should generate a password containing special characters', () => {
    const password = generateSecurePassword();
    const hasSpecialChars = /[!@#$%^&*()_+{}[\]:;<>,.?~]/.test(password);
    expect(hasSpecialChars).toBe(true);
  });

  it('should generate unique passwords', () => {
    const password1 = generateSecurePassword();
    const password2 = generateSecurePassword();
    expect(password1).not.toBe(password2);
  });
});