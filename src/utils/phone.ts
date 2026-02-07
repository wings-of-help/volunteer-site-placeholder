import { formatUAWithoutCode } from './validators';

export const formatPhoneForDisplay = (phone?: string) => {
  if (!phone) return '';

  // оставляем только цифры
  const digits = phone.replace(/\D/g, '');

  // если номер пришёл с кодом страны
  const uaDigits =
    digits.length === 12 && digits.startsWith('380')
      ? digits.slice(3)
      : digits;

  return `+380 ${formatUAWithoutCode(uaDigits)}`;
};
