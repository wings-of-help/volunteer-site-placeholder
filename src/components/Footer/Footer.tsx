import { useTranslation } from "react-i18next";
import "./Footer.scss"
export default function Footer() {
  const { t } = useTranslation();
  return (
    <footer className="footer">
      <nav className="footer__nav">
        <div className='footer__nav__wings-sector'>
        <img className="footer__nav__logo" src="/images/ui/Header-Logo-Image.png" alt="footer-logo" />
        <p className="footer__nav__wings-sector__title">Wings of help</p>
      </div>

      <p className="footer__nav__discribe">{t("describe")}</p>

      <div className="footer__nav__contacts">
        <div className="footer__nav__support">📧 support@wingsofhelp.org</div>

        <div className="footer__nav__explores">
          <div className="footer__nav__explores__requests">{t("explores__requests")}</div>
          <div className="footer__nav__explores__offers">{t("explores__offers")}</div>
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
