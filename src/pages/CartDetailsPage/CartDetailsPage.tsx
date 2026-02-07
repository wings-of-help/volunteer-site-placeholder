import { Link, useNavigate, useParams, useLocation } from 'react-router-dom';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';

import './CartDetailsPage.scss';

import arrow from '../../assets/arrow-down.svg';
import calendar from '../../assets/CalendarBlank.png';
import map from '../../assets/MapPin.png';
import phone from '../../assets/Phone.png';
import envelope from '../../assets/Envelope.png';
import dot from '../../assets/Ellipse 3.png';

import { useAuth } from '../../context/AuthContext';
import { useUserRole } from '../../context/RoleContext';

import ActiveGroup from '../../components/ActiveGroup/ActiveGroup';
import Modal from '../../components/UI-elements/Modal/Modal';

import { mockHelpCarts } from '../../api/helpCarts.api';

type Props = {
  type: 'requests' | 'offers';
};

export default function CartDetailsPage({ type }: Props) {
  const [activeModal, setActiveModal] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();
  const { cartId } = useParams();
  const { t } = useTranslation();

  const { isAuth } = useAuth();
  const { isVolunteer } = useUserRole();

  const backPath =
    (location.state as { from?: string })?.from ??
    (type === 'requests' ? '/requests' : '/offers');

  const cart = mockHelpCarts.find(item => item.id === Number(cartId));

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

              {type === 'requests' ? (
                <div className="status">
                  <img src={dot} alt="status" className="status__dot" />
                  <p>{cart.status}</p>
                </div>
              ) : (
                <div className="cart-details-page__info__points-point">
                  <p className="point-text aid">{cart.category_name}</p>
                </div>
              )}
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

            {isAuth && isVolunteer && type === 'requests' && (
              <button
                className="offer__button"
                onClick={() => {
                  setActiveModal(true);
                  /* should change status to in progress and disable button */
                }}
              >
                {t('Offer-help')}
              </button>
            )}

            {isAuth && !isVolunteer && type === 'requests' && (
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

            {isAuth && isVolunteer && type === 'offers' && (
              <p className="offer__wrong">
                {t('Only registered requesters can respond to this offer.')}
              </p>
            )}
          </div>

          {/* PERSON INFO */}
          <div className="cart-details-page__info__person-info">
            <h1>
              {type === 'requests' ? t('Requester') : t('Volunteer')}
            </h1>

            {isAuth && (
              <div className="cart-details-page__info__person-info__details">
                <div>Cody Warren</div>
                <div>
                  <img src={phone} alt="phone" />
                  +380 123 456 78 90
                </div>
                <div>
                  <img src={envelope} alt="email" />
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

      {activeModal && <Modal setActive={setActiveModal} />}
    </>
  );
}