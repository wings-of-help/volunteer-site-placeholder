export const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export const isOnlyLetters = (value: string) =>
  /^[A-Za-zА-Яа-яІіЇїЄє' -]+$/.test(value.trim());

export const hasMinTwoLetters = (value: string) => value.trim().length >= 2;

export const isEmailValid = (email: string) => {
  return emailRegex.test(email);
};

export const isPhoneValid = (phone: string) => {
  return phone.replace(/\D/g, '').length === 9;
};

// оставляем только цифры
export const getDigits = (value: string) => value.replace(/\D/g, '');

// формат для UI (93-530-45-73)
export const formatUAWithoutCode = (digits: string) => {
  const clean = digits.slice(0, 9);

  const parts = [
    clean.slice(0, 2),
    clean.slice(2, 5),
    clean.slice(5, 7),
    clean.slice(7, 9),
  ].filter(Boolean);

  return parts.join('-');
};

// формат для бекенда (+380XXXXXXXXX)
export const formatPhoneForBackend = (digits: string) =>
  `+380${digits.slice(0, 9)}`;

/* ================= PASSWORD VALIDATION ================= */

export const hasMinLength = (password: string) => password.length >= 8;

export const hasUppercaseLetter = (password: string) => /[A-Z]/.test(password);

export const hasLowercaseLetter = (password: string) => /[a-z]/.test(password);

export const hasSpecialCharacter = (password: string) =>
  /[^A-Za-z0-9]/.test(password);

export const isPasswordMatch = (password: string, confirm: string) =>
  password === confirm;

export const isPasswordValid = (password: string, confirm: string) =>
  hasMinLength(password) &&
  hasUppercaseLetter(password) &&
  hasLowercaseLetter(password) &&
  hasSpecialCharacter(password) &&
  isPasswordMatch(password, confirm);
