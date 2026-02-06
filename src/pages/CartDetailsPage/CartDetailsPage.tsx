import { Link, useNavigate } from "react-router-dom"
import "./CartDetailsPage.scss"
import arrow from "../../assets/arrow-down.svg"
import calendar from "../../assets/CalendarBlank.png"
import map from "../../assets/MapPin.png"
import phone from "../../assets/Phone.png"
import envelope from "../../assets/Envelope.png"
import { useAuth } from "../../context/AuthContext"
import { useUserRole } from "../../context/RoleContext"
import ActiveGroup from "../../components/ActiveGroup/ActiveGroup"
import { useTranslation } from "react-i18next"
import dot from "../../assets/Ellipse 3.png"
import { useState } from "react"
import Modal from "../../components/UI-elements/Modal/Modal"

type Props = {
  type: "requests" | "offers";
}

export default function CartDetailsPage({type}: Props) {
  const [activeModal, setActiveModal] = useState(false);
  const navigate = useNavigate();
  const { isAuth } = useAuth();
  const { isVolunteer } = useUserRole();
  const { t } = useTranslation();

  return (
    <>
    <div className="cart-details-page">
      <div className="cart-details-page__container">
        
        <nav className="cart-details-page__nav">
          <div onClick={() => navigate(-1)} className="cart-details-page__nav-links">
            <img
              className="cart-details-page__nav-link"
              src={arrow}
              alt="home"
            />
            <p className="cart-details-page__nav-text">Back to {type}</p>
          </div>
        </nav>

        <div className="cart-details-page__info">
          <h1 className="cart-details-page__info__title">Food & Hygiene Supplies for IDP Family</h1>

          <div className="cart-details-page__info__points">

            <div className="cart-details-page__info__points-point">
              <img src={calendar} alt="calendar" className="date-point" />
              <p className="point-text">Jan 18, 2026</p>
            </div>

            <div className="cart-details-page__info__points-point">
              <img src={map} alt="map" className="map-point" />
              <p className="point-text">Lviv</p>
            </div>

            {isAuth ? (
              <div className="status-box">
                <div className="cart-details-page__info__points-point">
                  <p className="point-text aid">Humanitarian Aid</p>
                </div>

                <div className="status">
                  <img src={dot} alt="dot" className="status__dot"/>
                  <p>New</p>
                </div>

              </div>
            ) : (
              <div className="cart-details-page__info__points-point">
                <p className="point-text aid">Humanitarian Aid</p>
              </div>
            )}
            
          </div>

          <div className="cart-details-page__info__about">
            <div className="cart-details-page__info__about__title">About</div>

            <div className="cart-details-page__info__about__p">
              A family of four, recently displaced due to ongoing conflict,
              has just relocated to Lviv and is facing urgent basic needs.
              The family includes two young children, aged 5 and 9, who 
              require daily meals and essential hygiene products. The parents 
              are doing their best to settle in, but currently do not have enough
              food, cleaning supplies, or personal care items to cover the next 
              few days. Immediate assistance with food packages, hygiene kits, 
              and other essentials is critical to ensure the family’s well-being 
              and to help them stabilize in their new environment. They would greatly 
              benefit from support within the next three days.
            </div>

            {!isAuth && type === "requests" && (
              <div className="cart-details-page__info__about__register">
              <button onClick={() => navigate("/signup")} className="cart-details-page__info__about__register__button">
                Register to Help
              </button>

              <div className="cart-details-page__info__about__register__signin">
                <p className="cart-details-page__info__about__register__signin__p">
                  Already have an account?
                </p>
                <Link to="/signin" className="cart-details-page__info__about__register__signin__link">Sign In</Link>
              </div>
            </div>
            )}

            {isAuth && isVolunteer && type === "requests" && (
              <button onClick={() => {
                setActiveModal(true);

                //should change status to in progress and disable button
              }} 
                className="offer__button">
                Offer help
              </button>
            )}

            {isAuth && !isVolunteer && type === "requests" && (
              <p className="offer__wrong">
                Only registered volunteers can respond to this request.
              </p>
            )}

            {!isAuth && type === "offers" && (
              <div className="cart-details-page__info__about__register">
              <button onClick={() => {navigate("/signup")}} className="cart-details-page__info__about__register__button">
                Sign up to Request Help
              </button>

              <div className="cart-details-page__info__about__register__signin">
                <p className="cart-details-page__info__about__register__signin__p">
                  Already have an account?
                </p>
                <Link to="/signin" className="cart-details-page__info__about__register__signin__link">Sign In</Link>
              </div>
            </div>
            )}

            {isAuth && isVolunteer && type === "offers" && (
              <p className="offer__wrong">
                Only registered requesters can respond to this offer.
              </p>
            )}

            {isAuth && !isVolunteer && type === "offers" && (
              <button onClick={() => {
                setActiveModal(true)

                //should change status to in progress and disable button
              }} 
                className="offer__button">
                Request Help
              </button>
            )}

          </div>
            <div className="cart-details-page__info__person-info">
    
              {type === "requests" ? (
                <h1 className="cart-details-page__info__person-info__title">
                  Requester
                  {!isAuth && <>: <strong>Cody Warren</strong></>}
                  </h1>
              ) : (
                <h1 className="cart-details-page__info__person-info__title">Volunteer: <strong>Cody warren</strong></h1>
              )}

              <div className="cart-details-page__info__person-info__details">

                {isAuth && (
                  <div className="cart-details-page__info__person-info__details-box">
                  <div className="cart-details-page__info__person-info__details__name">
                    Cody Warren
                  </div>
                  <div className="cart-details-page__info__person-info__details__d">
                    <img src={phone} alt="phone" />
                    +380 123 456 78 90
                  </div>
                  <div className="cart-details-page__info__person-info__details__d">
                    <img src={envelope} alt="mail" />
                    cody.warren@example.com
                  </div>
                </div>
                )}
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
    </div>

    {activeModal && <Modal setActive={setActiveModal}/>}
    </>
  )
}
