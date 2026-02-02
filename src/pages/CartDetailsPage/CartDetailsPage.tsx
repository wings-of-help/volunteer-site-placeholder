import { Link, useNavigate } from "react-router-dom"
import "./CartDetailsPage.scss"

type Props = {
  type: string;
}

export default function CartDetailsPage({type}: Props) {
  const navigate = useNavigate();
  return (
    <div className="cart-details-page">
      <div className="cart-details-page__container">
        
        <nav className="cart-details-page__nav">
          <div onClick={() => navigate(-1)} className="cart-details-page__nav-links">
            <img
              className="cart-details-page__nav-link"
              src="src/assets/arrow-down.svg"
              alt="home"
            />
            <p className="cart-details-page__nav-text">Back to {type}</p>
          </div>
        </nav>

        <div className="cart-details-page__info">
          <h1 className="cart-details-page__info__title">Food & Hygiene Supplies for IDP Family</h1>

          <div className="cart-details-page__info__points">

            <div className="cart-details-page__info__points-point">
              <img src="src/assets/CalendarBlank.png" alt="calendar" className="date-point" />
              <p className="point-text">Jan 18, 2026</p>
            </div>

            <div className="cart-details-page__info__points-point">
              <img src="src/assets/MapPin.png" alt="map" className="map-point" />
              <p className="point-text">Lviv</p>
            </div>

            <div className="cart-details-page__info__points-point">
              <p className="point-text aid">Humanitarian Aid</p>
            </div>

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

          </div>
            <div className="cart-details-page__info__person-info">
    
              <h1 className="cart-details-page__info__person-info__title">Requester</h1>
              <div className="cart-details-page__info__person-info__details">

                <div className="cart-details-page__info__person-info__details-box">
                  <div className="cart-details-page__info__person-info__details__name">
                    Cody Warren
                  </div>
                  <div className="cart-details-page__info__person-info__details__d">
                    <img src="src/assets/Phone.png" alt="phone" />
                    +380 123 456 78 90
                  </div>
                  <div className="cart-details-page__info__person-info__details__d">
                    <img src="src/assets/Envelope.png" alt="phone" />
                    cody.warren@example.com
                  </div>
                </div>

                <div className="cart-details-page__info__person-info__register">
                  <button onClick={() => navigate("/signup")} 
                    className="cart-details-page__info__person-info__register__button">
                    Sign up to view
                  </button>

                  <div className="cart-details-page__info__person-info__register__signin">
                    <p className="cart-details-page__info__person-info__register__signin-p">
                      Already have an account?
                    </p>
                    <Link to="/signin" className="cart-details-page__info__about__register__signin__link">Sign in</Link>
                  </div>
                </div>
              </div>
            </div>
        </div>
      </div>
    </div>
  )
}
