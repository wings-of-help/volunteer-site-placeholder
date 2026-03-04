import './ErrorPage.scss'
import errorImg from "../../assets/404.png"
import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom';

export default function ErrorPage() {
  const {t} = useTranslation();
  return (
    <div className='error-page'>
      <img src={errorImg} alt="error" className='error-page__404'/>

      <nav className="error-page__nav">
        <div className="error-page__nav__text">
          <h1 className="error-page__nav__text__title">{t("Page-Not-Found")}</h1>
          <p className="error-page__nav__text__p">{t("The-page-youre-looking-for-isnt-available")}</p>
        </div>
        <Link to="/" className="error-page__nav__button">{t("Go-back-Home")}</Link>
      </nav>
    </div>
  )
}
