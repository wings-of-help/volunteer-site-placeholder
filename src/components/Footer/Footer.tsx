import { useTranslation } from "react-i18next";
import "./Footer.scss"
import logo from '../../assets/header_logo_image.svg';
import telegramIcon from '../../assets/Telegram-icon.svg';
import facebookIcon from '../../assets/Facebook-icon.svg';
import instagramIcon from '../../assets/Instagram-icon.svg';
import { Link } from "react-router-dom";

export default function Footer() {
  const { t } = useTranslation();
  return (
    <footer className="footer">
      <nav className="footer__nav">

        <Link to='/' className='footer__nav__wings-sector'>
          <img className="footer__nav__logo" src={logo} alt="footer-logo" />
          <p className="footer__nav__wings-sector__title">Wings of help</p>
        </Link>

      <p className="footer__nav__discribe">{t("describe")}</p>

      <div className="footer__nav__contacts">
        <div className="footer__nav__support">📧 support@wingsofhelp.org</div>

        <div className="footer__nav__explores">
          <Link to={"/requests"} className="footer__nav__explores__requests">{t("explores__requests")}</Link>
          <Link to={"/offers"} className="footer__nav__explores__offers">{t("explores__offers")}</Link>
        </div>

        <div className="footer__nav__explores">
          <p className="footer__nav__explores__social">{t("Our-social-media")}</p>

          <div className="footer__nav__explores__social__media">
            <img src={telegramIcon} alt="telegramIcon" />
            <img src={facebookIcon} alt="facebookIcon" />
            <img src={instagramIcon} alt="instagramIcon" />
          </div>
        </div>
      </div>

      <div className="footer__nav__end">
        <div className="footer__nav__end__wings">© 2026 Wings of Help</div>
        <div className="footer__nav__end__terms">Privacy Policy · Terms</div>
      </div>
      </nav>
    </footer>
  )
}
