import { NavLink } from 'react-router-dom';
import infoIcon from '../../assets/profile2.svg';
import infoIconGrey from '../../assets/infoIcon-grey.svg';
import requestsIcon from '../../assets/HandsPraying.svg';
import requestsIconWhite from '../../assets/HandsPraying-wite.svg';
import responsesIcon from '../../assets/ArrowsClockwise.svg';
import responsesIconWhite from '../../assets/ArrowsClockwise-wite.svg';
import logoutIcon from '../../assets/Logout.svg';
import './ProfileSidebar.scss';
import type { User } from '../../api/types/auth';
import { useTranslation } from 'react-i18next';

interface Props {
  user: User;
  onLogoutClick: () => void;
}

export const ProfileSidebar = ({ user, onLogoutClick }: Props) => {
  const { t } = useTranslation();

  const role = user.role;
  const isRequester = role === 'distressed' || role === 'admin';
  const isVolunteer = role === 'volunteer';

  return (
    <aside className='profile__sidebar'>
      <div className='profile__user'>
        <div className='profile__user-info'>
          <p className='profile__name'>
            {user.first_name} {user.last_name}
          </p>
          <p className='profile__email'>{user.email}</p>
        </div>
      </div>

      <nav className='profile__menu'>
        {/* PERSONAL INFO — для всіх */}
        <NavLink
          to="/profile/info"
          end
          className={({ isActive }) =>
            `profile__menu-item ${isActive ? 'profile__menu-item--active' : ''}`
          }
        >
          {({ isActive }) => (
            <>
              <img src={isActive ? infoIcon : infoIconGrey} alt='' />
              <span>{t('Personal-Information')}</span>
            </>
          )}
        </NavLink>

        {/* REQUESTER (distressed + admin) */}
        {isRequester && (
          <NavLink
            to='/profile/requests'
            className={({ isActive }) =>
              `profile__menu-item ${isActive ? 'profile__menu-item--active' : ''}`
            }
          >
            {({ isActive }) => (
              <>
                <img src={isActive ? requestsIconWhite : requestsIcon} alt='' />
                <span>{t('My-Requests')}</span>
              </>
            )}
          </NavLink>
        )}

        {/* VOLUNTEER */}
        {isVolunteer && (
          <NavLink
            to='/profile/offers'
            className={({ isActive }) =>
              `profile__menu-item ${isActive ? 'profile__menu-item--active' : ''}`
            }
          >
            {({ isActive }) => (
              <>
                <img src={isActive ? requestsIconWhite : requestsIcon} alt='' />
                <span>{t('My-Offers')}</span>
              </>
            )}
          </NavLink>
        )}

        {/* MY RESPONSES — для всіх */}
        <NavLink
          to='/profile/responses'
          className={({ isActive }) =>
            `profile__menu-item ${isActive ? 'profile__menu-item--active' : ''}`
          }
        >
          {({ isActive }) => (
            <>
              <img src={isActive ? responsesIconWhite : responsesIcon} alt='' />
              <span>{t('My-Responses')}</span>
            </>
          )}
        </NavLink>

        {/* LOGOUT */}
        <button
          className='profile__menu-item profile__menu-item--logout'
          onClick={onLogoutClick}
        >
          <img src={logoutIcon} alt='' />
          <span>{t('Log-out')}</span>
        </button>
      </nav>
    </aside>
  );
};
