import { useState } from 'react';
import "./LangChanger.scss"
import { useTranslation } from "react-i18next"

export const LangChanger = () => {
  const [open, setOpen] = useState(false);
  const [lang, setLang] = useState('EN');

  const { i18n } = useTranslation();

  const selectLang = (value: string) => {
    setLang(value);
    setOpen(false);
  };

  return (
    <div className="lang-dropdown">
      <button
        className="header__nav__buttons__button lang-changer"
        onClick={() => setOpen(prev => !prev)}
      >
        {lang}

        <img className="arrow" src="/images/ui/ep_arrow-down.png" alt="dropdown" />
      </button>

      {open && (
        <div className="lang-dropdown__menu">
          <div className='lang-dropdown__menu-item' onClick={() => {
            selectLang('EN');
            i18n.changeLanguage("en");
          }}>
            EN
          </div>

          <div className='lang-dropdown__menu-item' onClick={() => {
            selectLang('UK');
            i18n.changeLanguage("uk");
            }}>
            UK
          </div>
        </div>
      )}
    </div>
  );
};
