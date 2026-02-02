import './Toast.scss';

type Props = {
  message: string;
  visible: boolean;
};

export const Toast = ({ message, visible }: Props) => {
  return (
    <div className={`toast ${visible ? 'toast--visible' : ''}`}>
      {message}
    </div>
  );
};
