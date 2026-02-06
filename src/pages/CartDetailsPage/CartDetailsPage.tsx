import { Link, useNavigate, useParams } from "react-router-dom"
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
import { mockHelpCarts } from "../../api/helpCarts.api"

type Props = {
  type: "requests" | "offers";
}

export default function CartDetailsPage({type}: Props) {
  const [activeModal, setActiveModal] = useState(false);
  const navigate = useNavigate();
  const { isAuth } = useAuth();
  const { isVolunteer } = useUserRole();
  const { t } = useTranslation();

  const { cartId } = useParams();

  const cart = mockHelpCarts.find(
    item => item.id === Number(cartId)
  );

  if (!cart) {
    return <h2>Cart not found</h2>;
  }

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
          <h1 className="cart-details-page__info__title">{cart.title}</h1>

          <div className="cart-details-page__info__points">

            <div className="cart-details-page__info__points-point">
              <img src={calendar} alt="calendar" className="date-point" />
              <p className="point-text">{cart.date}</p>
            </div>

            <div className="cart-details-page__info__points-point">
              <img src={map} alt="map" className="map-point" />
              <p className="point-text">{cart.location_name}</p>
            </div>

            {isAuth ? (
              <div className="status-box">
                <div className="cart-details-page__info__points-point">
                  <p className="point-text aid">{cart.category_name}</p>
                </div>

                <div className="status">
                  <img src={dot} alt="dot" className="status__dot"/>
                  <p>{cart.status}</p>
                </div>

              </div>
            ) : (
              <div className="cart-details-page__info__points-point">
                <p className="point-text aid">{cart.category_name}</p>
              </div>
            )}
            
          </div>

          <div className="cart-details-page__info__about">
            <div className="cart-details-page__info__about__title">About</div>

            <div className="cart-details-page__info__about__p">
              {cart.description}
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
          title={type === 'requests' ? t("active-requests-title") : t("active-offers-title")}
          p={type === 'requests' ? t("active-requests-1st-p") : t("active-offers-1st-p")}
          p2={type === 'requests' ? t("active-requests-2nd-p") : t("active-offers-2nd-p")}
          seeAll={type === 'requests' ? t("see-all-requests") : t("see-all-offers")}
          path={type}
        /> 
    </div>

    {activeModal && <Modal setActive={setActiveModal}/>}
    </>
  )
}
