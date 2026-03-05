import React from 'react';
import './Modal.scss';
import check from "../../../assets/SealCheck.svg"
import { useTranslation } from 'react-i18next';

type Props = {
  setActive: React.Dispatch<React.SetStateAction<boolean>>;
  setWasClicked: React.Dispatch<React.SetStateAction<boolean>>;
  title: string;
  p: string;
  cartId: string | undefined;
};

const Modal: React.FC<Props> = ({ setActive, title, p, setWasClicked, cartId }) => {
  const {t} = useTranslation();
  return (
    <div className="modal" >
      <div className="modal__content">
        <img src={check} alt="check" className='modal__photo'/>

        <div className="modal__text">
          <h1 className="modal__title">{title}</h1>
          <p className="modal__desc">{p}</p>
        </div>
        
        <button onClick={() => {
            setActive(false);
            setWasClicked(true);
            localStorage.setItem(`offerButtonClicked-${cartId}`, 'true');
          }} 
        className="modal__button">{t("Okay")}</button>
      </div>
    </div>
  );
};

export default Modal