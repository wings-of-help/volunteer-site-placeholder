import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { LangChanger } from '../UI-elements/LangChanger/LangChanger';
import { Link, NavLink } from 'react-router-dom';
import logo from '../../assets/header_logo_image.svg';
import { useAuth } from '../../context/AuthContext';
import profileIcon from '../../assets/profile.svg';
import burgerIcon from '../../assets/burger-menu.svg';
import closeIcon from '../../assets/cross-black.svg';

import './Header.scss';
import classNames from 'classnames';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { t } = useTranslation();
  const { isAuth } = useAuth();

  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setIsMenuOpen(false);
    };

    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, []);

  useEffect(() => {
    document.body.style.overflow = isMenuOpen ? 'hidden' : 'auto';

    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [isMenuOpen]);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        setIsMenuOpen(false);
      }
    };

    window.addEventListener('resize', handleResize);

    return () => window.removeEventListener('resize', handleResize);
  }, []);

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
            <NavLink
              to='/requests'
              className={ActivateLink}
              onClick={() => setIsMenuOpen(false)}
            >
              <span className='header__nav__pages__page__title'>
                {t('Requests')}
              </span>
            </NavLink>
          </div>

          <div className='header__nav__pages__item'>
            <NavLink
              to='/offers'
              className={ActivateLink}
              onClick={() => setIsMenuOpen(false)}
            >
              <span className='header__nav__pages__page__title'>
                {t('Offers')}
              </span>
            </NavLink>
          </div>

          <div className='header__nav__pages__item'>
            <NavLink
              to='/about'
              className={ActivateLink}
              onClick={() => setIsMenuOpen(false)}
            >
              <span className='header__nav__pages__page__title'>
                {t('About-us')}
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
            <Link to='/profile'>
              <button className='header__nav__buttons__button header__profile-btn'>
                <img src={profileIcon} alt='profileIcon' />
                {t('my-profile')}
              </button>
            </Link>
          )}
        </div>

        {/* BURGER */}
        <button className='header__burger' onClick={() => setIsMenuOpen(true)}>
          <img src={burgerIcon} alt='menu' />
        </button>
      </nav>

      {/* MOBILE MENU */}
      {isMenuOpen && (
        <div className='mobile-menu'>
          <button
            className='mobile-menu__close'
            onClick={() => setIsMenuOpen(false)}
          >
            <img src={closeIcon} alt='close menu' />
          </button>

          <nav className='mobile-menu__nav'>
            <NavLink
              to='/requests'
              className='header__nav__pages__page'
              onClick={() => setIsMenuOpen(false)}
            >
              <span className='header__nav__pages__page__title'>
                {t('Requests')}
              </span>
            </NavLink>

            <NavLink
              to='/offers'
              className='header__nav__pages__page'
              onClick={() => setIsMenuOpen(false)}
            >
              <span className='header__nav__pages__page__title'>
                {t('Offers')}
              </span>
            </NavLink>

            <NavLink
              to='/about'
              className='header__nav__pages__page'
              onClick={() => setIsMenuOpen(false)}
            >
              <span className='header__nav__pages__page__title'>
                {t('About-us')}
              </span>
            </NavLink>
          </nav>

          {!isAuth && (
            <div className='mobile-menu__buttons'>
              <Link to='/signin' onClick={() => setIsMenuOpen(false)}>
                {t('Sign-in')}
              </Link>

              <Link to='/signup/step-1' onClick={() => setIsMenuOpen(false)}>
                {t('Sign-up')}
              </Link>
            </div>
          )}

          {isAuth && (
            <Link to='/profile' onClick={() => setIsMenuOpen(false)}>
              <button className='mobile-menu__profile'>
                <img src={profileIcon} alt='profileIcon' />
                {t('my-profile')}
              </button>
            </Link>
          )}

          <div className='mobile-menu__lang'>
            <LangChanger />
          </div>
        </div>
      )}
    </header>
  );
}
