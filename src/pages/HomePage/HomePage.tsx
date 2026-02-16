import { useTranslation } from "react-i18next";
import "./HomePage.scss"
import { Link } from "react-router-dom";
import ActiveGroup from "../../components/ActiveGroup/ActiveGroup";
import photo1 from "../../assets/post-1.png"
import photo2 from "../../assets/post-2.png"
import photo3 from "../../assets/post-3.png"
import photo4 from "../../assets/post-4.png"
import bigpost1 from "../../assets/Illustration-1.png"
import bigpost2 from "../../assets/Illustration-2.png"

import icon1 from "../../assets/Home-page-icon1.svg"
import icon2 from "../../assets/Home-page-icon2.svg"
import icon3 from "../../assets/Home-page-icon3.svg"
import icon4 from "../../assets/Home-page-icon4.svg"
import icon5 from "../../assets/Home-page-icon5.svg"
  
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
            <img className="home-instructions__blocks__block__p" src={photo1} />
            <div className="home-instructions__blocks__block__num">01</div>
            <div className="home-instructions__blocks__block__title">{t("instructions-1st-block-title")}</div>
          </div>

          <div className="home-instructions__blocks__block">
            <img className="home-instructions__blocks__block__p" src={photo2} />
            <div className="home-instructions__blocks__block__num">02</div>
            <div className="home-instructions__blocks__block__title">{t("instructions-2nd-block-title")}</div>
          </div>

          <div className="home-instructions__blocks__block">
            <img className="home-instructions__blocks__block__p" src={photo3} />
            <div className="home-instructions__blocks__block__num">03</div>
            <div className="home-instructions__blocks__block__title">{t("instructions-3rd-block-title")}</div>
          </div>

          <div className="home-instructions__blocks__block">
            <img className="home-instructions__blocks__block__p" src={photo4} />
            <div className="home-instructions__blocks__block__num">04</div>
            <div className="home-instructions__blocks__block__title">{t("instructions-4th-block-title")}</div>
          </div>
        </div>
      </div>

      <div className="home-description">
        <p className="home-description__title">{t("description__title")}</p>

        <div className="home-description__blocks">

          <div className="home-description__blocks__block">
            <img className="home-instructions__blocks__block__photo" src={bigpost1} />
            
            <div className="home-description__blocks__block__wrapper">
              <div className="home-description__blocks__block__title">{t("description-1st-block-title")}</div>

              <div className="home-description__blocks__block__paragraphs">
                <div className="home-description__blocks__block__paragraphs__wrapper">
                  <img src={icon1} alt="icon1" className="icon" />

                  <p className="home-description__blocks__block__paragraphs__p">
                    {t("description-1st-block-1st-p")}
                  </p>
                </div>
                <div className="home-description__blocks__block__paragraphs__wrapper">
                  <img src={icon2} alt="icon1" className="icon"/>

                   <p className="home-description__blocks__block__paragraphs__p">
                    {t("description-1st-block-2nd-p")}
                  </p>
                </div>
                <div className="home-description__blocks__block__paragraphs__wrapper">
                  <img src={icon3} alt="icon1" className="icon" />

                  <p className="home-description__blocks__block__paragraphs__p">
                    {t("description-1st-block-3rd-p")}
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="home-description__blocks__block">
            <img className="home-instructions__blocks__block__photo" src={bigpost2} />
            
            <div className="home-description__blocks__block__wrapper">
              <div className="home-description__blocks__block__title">{t("description-2nd-block-title")}</div>

              <div className="home-description__blocks__block__paragraphs">
                <div className="home-description__blocks__block__paragraphs__wrapper">
                  <img src={icon4} alt="icon1" className="icon" />

                  <p className="home-description__blocks__block__paragraphs__p">
                    {t("description-2nd-block-1st-p")}
                  </p>
                </div>
                <div className="home-description__blocks__block__paragraphs__wrapper">
                  <img src={icon5} alt="icon1" className="icon"/>

                   <p className="home-description__blocks__block__paragraphs__p">
                    {t("description-2nd-block-2nd-p")}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

        <ActiveGroup 
          title={t("active-requests-title")}
          p={t("active-requests-1st-p")}
          p2={t("active-requests-2nd-p")}
          seeAll={t("see-all-requests")}
          path="/requests"
        />

        <ActiveGroup
          title={t("active-offers-title")}
          p={t("active-offers-1st-p")}
          p2={t("active-offers-2nd-p")}
          seeAll={t("see-all-offers")}
          path="/offers"
        /> 
    </div>
  )
}