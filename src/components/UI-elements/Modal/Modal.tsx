import React from 'react';
import './Modal.scss';
import check from "../../../assets/SealCheck.png"
import { useTranslation } from 'react-i18next';

type Props = {
  setActive: React.Dispatch<React.SetStateAction<boolean>>;
};

const Modal: React.FC<Props> = ({ setActive }) => {
  const {t} = useTranslation();
  return (
    <div className="modal" >
      <div className="modal__content">
        <img src={check} alt="check" className='modal__photo'/>

        <div className="modal__text">
          <h1 className="modal__title">Your offer has been sent!</h1>
          <p className="modal__desc">Your support can make a real difference.</p>
        </div>
        
        <button onClick={() => setActive(false)} className="modal__button">{t("Okay")}</button>
      </div>
    </div>
  );
};

export default Modal