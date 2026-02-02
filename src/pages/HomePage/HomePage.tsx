import { useTranslation } from "react-i18next";
import "./HomePage.scss"
import ActiveRequests from "../../components/ActiveGroup/ActiveGroup";
import { Link } from "react-router-dom";
import ActiveGroup from "../../components/ActiveGroup/ActiveGroup";

export default function HomePage() {
  const { t } = useTranslation();
  return (
    <div className="home__page">
      <div className="home">

        <div className="home__main">
          <div className="home__main__title">
            {t("main-title")}
          </div>

          <div className="home__main__p">
            {t("main-p")}
          </div>
        </div>

        <div className="home__buttons">
          <Link to={"/requests"} className="home__buttons__button button1">{t("nav-button-1")}</Link>
          <Link to={"/offers"} className="home__buttons__button button2">{t("nav-button-2")}</Link>
        </div>
      </div>

      <div className="home-instructions">

        <div className="home-instructions__main">
          <div className="home-instructions__main__title">{t("instructions__title")}</div>

          <div className="home-instructions__main__p">{t("instructions__p")}</div>
        </div>

        <div className="home-instructions__blocks">

          <div className="home-instructions__blocks__block">
            <div className="home-instructions__blocks__block__title">{t("instructions-1st-block-title")}</div>

            <div className="home-instructions__blocks__block__p">
              {t("instructions-1st-block-p")}
            </div>
          </div>

          <div className="home-instructions__blocks__block">
            <div className="home-instructions__blocks__block__title">{t("instructions-2nd-block-title")}</div>

            <div className="home-instructions__blocks__block__p">
              {t("instructions-2nd-block-p")}
            </div>
          </div>

          <div className="home-instructions__blocks__block">
            <div className="home-instructions__blocks__block__title">{t("instructions-3rd-block-title")}</div>

            <div className="home-instructions__blocks__block__p">
              {t("instructions-3rd-block-p")}
            </div>
          </div>

          <div className="home-instructions__blocks__block">
            <div className="home-instructions__blocks__block__title">{t("instructions-4th-block-title")}</div>

            <div className="home-instructions__blocks__block__p">
              {t("instructions-4th-block-p")}
            </div>
          </div>
        </div>
      </div>

      <div className="home-description">
        <p className="home-description__title">{t("description__title")}</p>

        <div className="home-description__blocks">

          <div className="home-description__blocks__block">
            <div className="home-description__blocks__block__title">{t("description-1st-block-title")}</div>

            <div className="home-description__blocks__block__paragraphs">
              <p className="home-description__blocks__block__paragraphs__p">
                {t("description-1st-block-1st-p")}
              </p>
              <p className="home-description__blocks__block__paragraphs__p">
                {t("description-1st-block-2nd-p")}
              </p>
              <p className="home-description__blocks__block__paragraphs__p">
                {t("description-1st-block-3rd-p")}
              </p>
            </div>
          </div>

          <div className="home-description__blocks__block">
            <div className="home-description__blocks__block__title">{t("description-2nd-block-title")}</div>

            <div className="home-description__blocks__block__paragraphs">
              <p className="home-description__blocks__block__paragraphs__p">
                {t("description-2nd-block-1st-p")}
              </p>
              <p className="home-description__blocks__block__paragraphs__p">
                {t("description-2nd-block-2nd-p")}
              </p>
              <p className="home-description__blocks__block__paragraphs__p">
                {t("description-2nd-block-3rd-p")}
              </p>
            </div>
          </div>
        </div>
      </div>

        <ActiveGroup 
          title={t("active-requests-title")}
          p={t("active-requests-1st-p")}
          p2={t("active-requests-2nd-p")}
          seeAll={t("see-all-requests")}
        /> 
        <ActiveGroup
          title={t("active-offers-title")}
          p={t("active-offers-1st-p")}
          p2={t("active-offers-2nd-p")}
          seeAll={t("see-all-offers")}
        /> 
      
    </div>
  )
}