import { useTranslation } from "react-i18next";
import "./HomePage.scss"

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
          <div className="home__buttons__button button1">{t("nav-button-1")}</div>
          <div className="home__buttons__button button2">{t("nav-button-2")}</div>
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

      <div className="home-active-requests">

        <div className="home-active-requests__main">
          
          <div className="home-active-requests__main__title">{t("active-requests-title")}</div>

          <div className="home-active-requests__main__paragraphs">
            <p className="home-active-requests__main__paragraphs__p">
              {t("active-requests-1st-p")}
            </p>
            <p className="home-active-requests__main__paragraphs__p">
              {t("active-requests-2nd-p")}
            </p>
          </div>
        </div>

        <div className="home-active-requests__blocks">

          <div className="home-active-requests__blocks__block">
            <div className="home-active-requests__blocks__block__photo"></div>

            <div className="home-active-requests__blocks__block__title">
              {t("active-requests-1st-block-title")}
            </div>

            <div className="home-active-requests__blocks__block__p">
              {t("active-requests-1st-block-p")}
            </div>

            <div className="home-active-requests__blocks__block__bottom">
              <p className="home-active-requests__blocks__block__bottom__city">{t("Kharkiv-city")}</p>
              <p className="home-active-requests__blocks__block__bottom__category">{t("Logistics")}</p>
            </div>
          </div>
          
          <div className="home-active-requests__blocks__block">
            <div className="home-active-requests__blocks__block__photo"></div>

            <div className="home-active-requests__blocks__block__title">
              {t("active-requests-1st-block-title")}
            </div>

            <div className="home-active-requests__blocks__block__p">
              {t("active-requests-1st-block-p")}
            </div>

            <div className="home-active-requests__blocks__block__bottom">
              <p className="home-active-requests__blocks__block__bottom__city">{t("Kharkiv-city")}</p>
              <p className="home-active-requests__blocks__block__bottom__category">{t("Logistics")}</p>
            </div>
          </div>

          <div className="home-active-requests__blocks__block">
            <div className="home-active-requests__blocks__block__photo"></div>

            <div className="home-active-requests__blocks__block__title">
              {t("active-requests-1st-block-title")}
            </div>

            <div className="home-active-requests__blocks__block__p">
              {t("active-requests-1st-block-p")}
            </div>

            <div className="home-active-requests__blocks__block__bottom">
              <p className="home-active-requests__blocks__block__bottom__city">{t("Kharkiv-city")}</p>
              <p className="home-active-requests__blocks__block__bottom__category">{t("Logistics")}</p>
            </div>
          </div>

          
          
        </div>

        <div className="home-active-requests__see-all">
          <p className="home-active-requests__see-all__p">{t("see-all")}</p>
          <img 
            src="/images/ui/ph_arrow-right-light.png" 
            alt="arrow-right-button" 
            className="home-active-requests__see-all__button" 
          />
        </div>
      </div>
    </div>
  )
}