import { NavLink } from 'react-router-dom';
import infoIcon from '../../assets/profile2.svg';
import infoIconGrey from '../../assets/infoIcon-grey.svg';
import requestsIcon from '../../assets/HandsPraying.svg';
import responsesIcon from '../../assets/ArrowsClockwise.svg';
import logoutIcon from '../../assets/Logout.svg';
import './ProfileSidebar.scss';
import type { User } from '../../api/types/auth';
import { useTranslation } from 'react-i18next';

interface Props {
  user: User;
  onLogoutClick: () => void;
  activeTab: string;
  onTabChange?: (tab: string) => void;
}

export const ProfileSidebar = ({
  activeTab,
  onTabChange,
  user,
  onLogoutClick,
}: Props) => {
  const { t } = useTranslation();
  
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
        {/* PERSONAL INFO */}
        <NavLink
          to='/profile'
          end
          className={({ isActive }) =>
            `profile__menu-item ${isActive ? 'profile__menu-item--active' : ''}`
          }
        >
          <img src={activeTab === 'info' ? infoIcon : infoIconGrey} alt='' />
          <span>{t("Personal-Information")}</span>
        </NavLink>

        {/* MY REQUESTS */}
        <NavLink
          to='/profile/requests'
          className={({ isActive }) =>
            `profile__menu-item ${isActive ? 'profile__menu-item--active' : ''}`
          }
        >
          <img src={requestsIcon} alt='' />
          <span>{t("My-Requests")}</span>
        </NavLink>

        {/* MY RESPONSES */}
        <NavLink
          to='/profile/responses'
          className={({ isActive }) =>
            `profile__menu-item ${isActive ? 'profile__menu-item--active' : ''}`
          }
        >
          <img src={responsesIcon} alt='' />
          <span>{t("My-Responses")}</span>
        </NavLink>

        {/* LOGOUT */}
        <button
          className='profile__menu-item profile__menu-item--logout'
          onClick={onLogoutClick}
        >
          <img src={logoutIcon} alt='' />
          <span>{t("Log-out")}</span>
        </button>
      </nav>
    </aside>
  );
};