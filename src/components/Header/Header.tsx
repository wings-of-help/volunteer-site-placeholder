import { useTranslation } from 'react-i18next';
import { LangChanger } from '../UI-elements/LangChanger/LangChanger';
import { Link, NavLink } from 'react-router-dom';
import logo from '../../assets/header_logo_image.svg';
import { useAuth } from '../../context/AuthContext';
import profileIcon from '../../assets/profile.svg';

import './Header.scss';
import classNames from 'classnames';

export default function Header() {
  const { t } = useTranslation();
  const { isAuth } = useAuth();

  const ActivateLink = ({ isActive }: { isActive: boolean }) =>
    classNames('header__nav__pages__page', {
      'has-underline': isActive,
    });

  return (
    <header className='header'>
      <nav className='header__nav'>
        <Link to='/' className='header__nav__wings-sector header__nav__brand'>
          <img src={logo} alt='header-logo' />
          <p className='header__nav__wings-sector__title'>Wings of help</p>
        </Link>

        <div className='header__nav__pages'>
          <div className='header__nav__pages__item'>
            <NavLink to='/requests' className={ActivateLink}>
              <span className='header__nav__pages__page__title'>
                {t('Requests')}
              </span>
            </NavLink>
          </div>

          <div className='header__nav__pages__item'>
            <NavLink to='/offers' className={ActivateLink}>
              <span className='header__nav__pages__page__title'>
                {t('Offers')}
              </span>
            </NavLink>
          </div>

          <div className='header__nav__pages__item'>
            <NavLink to='/about' className={ActivateLink}>
              <span className='header__nav__pages__page__title'>
                {t('About')}
              </span>
            </NavLink>
          </div>
        </div>

        <div className='header__nav__buttons'>
          <LangChanger />

          {!isAuth ? (
            <>
              <Link to='/signin'>
                <button className='header__nav__buttons__button sign-in'>
                  {t('Sign-in')}
                </button>
              </Link>

              <Link to='/signup/step-1'>
                <button className='header__nav__buttons__button sign-up'>
                  {t('Sign-up')}
                </button>
              </Link>
            </>
          ) : (
            <>
              <Link to='/profile'>
                <button className='header__nav__buttons__button header__profile-btn'>
                  <img src={profileIcon} alt='profileIcon' />
                  {t('my-profile')}
                </button>
              </Link>
            </>
          )}
        </div>
      </nav>
    </header>
  );
}
