import '../../pages/auth/AuthLayout.scss';

type PasswordHintProps = {
  isValid: boolean;
  text: string;
};

export const PasswordHint = ({ isValid, text }: PasswordHintProps) => {
  return (
    <li
      className={`auth-form__password-hint ${
        isValid ? 'is-valid' : ''
      }`}
    >
      <span className='auth-form__password-hint-icon' />
      <span>{text}</span>
    </li>
  );
};
