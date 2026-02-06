import infoIcon from '../../assets/profile2.svg';
import infoIconGrey from '../../assets/infoIcon-grey.svg';
import requestsIcon from '../../assets/HandsPraying.svg';
import responsesIcon from '../../assets/ArrowsClockwise.svg';
import logoutIcon from '../../assets/Logout.svg';
import './ProfileSidebar.scss';

import type { User } from '../../api/types/auth';

interface Props {
  activeTab: 'info' | 'requests' | 'responses';
  onTabChange: (tab: 'info' | 'requests' | 'responses') => void;
  user: User;
  onLogout: () => void;
}

export const ProfileSidebar = ({
  activeTab,
  onTabChange,
  user,
  onLogout,
}: Props) => {
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
        <button
          className={`profile__menu-item ${activeTab === 'info' ? 'profile__menu-item--active' : ''}`}
          onClick={() => onTabChange('info')}
        >
          <img src={activeTab === 'info' ? infoIcon : infoIconGrey} alt='' />
          <span>Personal Information</span>
        </button>

        <button
          className={`profile__menu-item ${activeTab === 'requests' ? 'profile__menu-item--active' : ''}`}
          onClick={() => onTabChange('requests')}
        >
          <img src={requestsIcon} alt='' />
          <span>My Requests</span>
        </button>

        <button
          className={`profile__menu-item ${activeTab === 'responses' ? 'profile__menu-item--active' : ''}`}
          onClick={() => onTabChange('responses')}
        >
          <img src={responsesIcon} alt='' />
          <span>My Responses</span>
        </button>

        <button
          className='profile__menu-item profile__menu-item--logout'
          onClick={onLogout}
        >
          <img src={logoutIcon} alt='' />
          <span>Log out</span>
        </button>
      </nav>
    </aside>
  );
};
