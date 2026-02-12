import { Link, useNavigate, useParams, useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

import './CartDetailsPage.scss';

import arrow from '../../assets/arrow-down.svg';
import calendar from '../../assets/CalendarBlank.png';
import map from '../../assets/MapPin.png';
import phone from '../../assets/phone.svg';
import envelope from '../../assets/mail.svg';
import dot from '../../assets/Ellipse 3.png';

import { useAuth } from '../../context/AuthContext';

import ActiveGroup from '../../components/ActiveGroup/ActiveGroup';
import Modal from '../../components/UI-elements/Modal/Modal';
import type { HelpCart } from '../../api/types/HelpCart';
import { GetHelpCarts } from '../../api/helpCarts.api';

type Props = {
  type: 'requests' | 'offers';
};

export default function CartDetailsPage({ type }: Props) {
  const [activeModal, setActiveModal] = useState(false);
   const [carts, setCarts] = useState<HelpCart[]>([]);
      useEffect(() => {
        GetHelpCarts()
          .then((data) => {
            // if (data.results.length > 8) {
            //   setCarts(data.results.slice(0, 8));
            // }
            setCarts(data.results);
          })
      }, []);

  const navigate = useNavigate();
  const location = useLocation();
  const { cartId } = useParams();
  const { t } = useTranslation();

  const { isAuth, user } = useAuth();

  const backPath =
    (location.state as { from?: string })?.from ??
    (type === 'requests' ? '/requests' : '/offers');

  const cart = carts.find(item => item.id === Number(cartId));

  if (!cart) {
    return <h2>Cart not found</h2>;
  }

  return (
    <>
      <div className="cart-details-page">
        <div className="cart-details-page__container">

          {/* NAV */}
          <nav className="cart-details-page__nav">
            <div
              className="cart-details-page__nav-links"
              onClick={() => navigate(backPath)}
            >
              <img
                className="cart-details-page__nav-link"
                src={arrow}
                alt="back"
              />
              <p className="cart-details-page__nav-text">
                {t('Back-to')} {type}
              </p>
            </div>
          </nav>

          {/* INFO */}
          <div className="cart-details-page__info">
            <h1 className="cart-details-page__info__title">{cart.title}</h1>

            <div className="cart-details-page__info__points">
              <div className="cart-details-page__info__points-point">
                <img src={calendar} alt="calendar" />
                <p className="point-text">{cart.date}</p>
              </div>

              <div className="cart-details-page__info__points-point">
                <img src={map} alt="map" />
                <p className="point-text">{cart.location_name}</p>
              </div>

              <div className="container">
                <div className="cart-details-page__info__points-point">
                  <p className="point-text aid">{cart.category_name}</p>
                </div>

                {isAuth && (
                  <div className="status">
                    <img src={dot} alt="status" className="status__dot" />
                    <p>{cart.status}</p>
                  </div>
                )}
              </div>

              <div className="cart-details-page__info__about">
                <h1 className="cart-details-page__info__about">{t("About")}</h1>

                <p className="cart-details-page__info__about__p">{cart.description}</p>
              </div>
            </div>

            {/* ACTIONS */}
            {!isAuth && type === 'requests' && (
              <div className="cart-details-page__info__about__register">
                <button
                  className="cart-details-page__info__about__register__button"
                  onClick={() => navigate('/signup')}
                >
                  {t('Register-to-Help')}
                </button>

                <div className="cart-details-page__info__about__register__signin">
                  <p>{t('Already-have-an-account')}</p>
                  <Link to="/signin">{t('Sign-In')}</Link>
                </div>
              </div>
            )}

            {isAuth && user?.role === "volunteer" && type === 'requests' && (
              <button
                className="offer__button"
                onClick={() => {
                  setActiveModal(true);
                }}
              >
                {t('Offer-help')}
              </button>
            )}

            {isAuth && user?.role === "distressed" && type === 'requests' && (
              <p className="offer__wrong">
                {t('Only-registered-volunteers-can-respond-to-this-request')}
              </p>
            )}

            {!isAuth && type === 'offers' && (
              <div className="cart-details-page__info__about__register">
                <button
                  className="cart-details-page__info__about__register__button"
                  onClick={() => navigate('/signup')}
                >
                  {t('Sign-up-to-Request-Help')}
                </button>

                <div className="cart-details-page__info__about__register__signin">
                  <p>{t('Already-have-an-account')}</p>
                  <Link to="/signin">{t('Sign-In')}</Link>
                </div>
              </div>
            )}

            {isAuth && user?.role === "volunteer" && type === 'offers' && (
              <p className="offer__wrong">
                {t('Only registered requesters can respond to this offer.')}
              </p>
            )}

            {isAuth && user?.role === "distressed" && type === 'offers' && (
              <button
                className="offer__button"
                onClick={() => {
                  setActiveModal(true);
                }}
              >
                {t("Request-help")}
              </button>
            )}
          </div>

          {/* PERSON INFO */}
          <div className="cart-details-page__info__person-info">
            <h1>
              {type === 'requests' ? t('Requester') : t('Volunteer')}
              {!isAuth && `: cody`}
            </h1>

            {isAuth && (
              <div className="cart-details-page__info__person-info__details">
                <div 
                  className="cart-details-page__info__person-info__details__name"
                >
                  Cody Warren
                </div>
                <div
                  className="cart-details-page__info__person-info__details__d"
                >
                  <img src={phone} className="icon" alt="phone" />
                  +380 123 456 78 90
                </div>
                <div
                  className="cart-details-page__info__person-info__details__d"
                >
                  <img src={envelope} className="icon" alt="email" />
                  cody.warren@example.com
                </div>
              </div>
            )}
          </div>

          <ActiveGroup
            title={
              type === 'requests'
                ? t('active-requests-title')
                : t('active-offers-title')
            }
            p={
              type === 'requests'
                ? t('active-requests-1st-p')
                : t('active-offers-1st-p')
            }
            p2={
              type === 'requests'
                ? t('active-requests-2nd-p')
                : t('active-offers-2nd-p')
            }
            seeAll={
              type === 'requests'
                ? t('see-all-requests')
                : t('see-all-offers')
            }
            path={type}
          />
        </div>
      </div>

      {activeModal && (
        <Modal 
          setActive={setActiveModal} 
          title={
            type === 'requests'
              ? t("Your-offer-has-been-sent")
              : t("Your-request-has-been-sent")
            }
            p={
              type === 'requests'
                ? t("Your-support-can-make-a-real-difference")
                : t("Thank-you-for-reaching-out-the-volunteer-may-contact-you-soon")
            }
        />)}
    </>
  );
}