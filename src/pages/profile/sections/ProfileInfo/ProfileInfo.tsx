import { useState } from 'react';
import { ProfileModal } from '../../ProfileModal/ProfileModal';
import { useAuth } from '../../../../context/AuthContext';
import { updateMyProfileRequest } from '../../../../api/user.api';
import type { User } from '../../../../api/types/auth';
import './ProfileInfo.scss';

interface Props {
  user: User;
}

export const ProfileInfo = ({ user }: Props) => {
  const [originalUser, setOriginalUser] = useState(user);
  const [form, setForm] = useState(user);

  const [activeModal, setActiveModal] = useState<
    null | 'email' | 'phone' | 'password'
  >(null);
  const { getMyProfile } = useAuth();

  const isDirty =
    form.first_name !== originalUser.first_name ||
    form.last_name !== originalUser.last_name;

  const capitalize = (value: string) => {
    if (!value) return value;
    return value.charAt(0).toUpperCase() + value.slice(1);
  };

  const handleSave = async () => {
    try {
      const payload = {
        first_name: form.first_name,
        last_name: form.last_name,
      };

      await updateMyProfileRequest(user.id, payload);

      setOriginalUser(form);

      await getMyProfile();
    } catch (error) {
      console.error('Failed to update profile', error);
    }
  };

  return (
    <>
      <div className='profile__card'>
        <div className='profile__header'>
          <h1 className='profile__title'>Profile</h1>
        </div>

        <div className='profile__form'>
          <label className='profile__field'>
            <span className='profile__label'>First name</span>
            <input
              className='profile__input'
              type='text'
              value={form.first_name}
              onChange={(e) =>
                setForm({ ...form, first_name: capitalize(e.target.value) })
              }
            />
          </label>

          <label className='profile__field'>
            <span className='profile__label'>Last name</span>
            <input
              className='profile__input'
              type='text'
              value={form.last_name}
              onChange={(e) =>
                setForm({ ...form, last_name: capitalize(e.target.value) })
              }
            />
          </label>

          <div className='profile__role'>
            <span className='profile__role-label'>Role:</span>
            <span className='profile__role-value'>Requester</span>
          </div>

          <div className='profile__actions'>
            <button
              className={`profile__save-btn ${
                isDirty ? 'profile__save-btn--active' : ''
              }`}
              disabled={!isDirty}
              onClick={handleSave}
            >
              Save changes
            </button>
          </div>
        </div>

        <div className='profile__contacts'>
          <h2 className='profile__contacts-title'>Contact Information</h2>

          <div className='profile__contact-row'>
            <div className='profile__contact-field'>
              <span className='profile__contact-label'>Email</span>
              <input
                className='profile__contact-input'
                disabled
                value={form.email}
              />
            </div>
            <button
              className='profile__contact-btn'
              onClick={() => setActiveModal('email')}
            >
              Change
            </button>
          </div>

          <div className='profile__contact-row'>
            <div className='profile__contact-field'>
              <span className='profile__contact-label'>Phone number</span>
              <input
                className='profile__contact-input'
                disabled
                value={form.phone_number}
              />
            </div>
            <button
              className='profile__contact-btn'
              onClick={() => setActiveModal('phone')}
            >
              Change
            </button>
          </div>

          <div className='profile__contact-row'>
            <div className='profile__contact-field'>
              <span className='profile__contact-label'>Password</span>
              <input
                className='profile__contact-input'
                disabled
                value='********'
              />
            </div>
            <button
              className='profile__contact-btn'
              onClick={() => setActiveModal('password')}
            >
              Change
            </button>
          </div>
        </div>
      </div>

      {activeModal && (
        <ProfileModal
          type={activeModal}
          onClose={() => setActiveModal(null)}
          // Email та phone поки що змінюються лише локально.
          // Бекенд потребує окремих ендпоінтів з підтвердженням коду
          onSuccess={(newValue) => {
            if (activeModal === 'email') {
              setForm((prev) => ({ ...prev, email: newValue }));
            }

            if (activeModal === 'phone') {
              setForm((prev) => ({ ...prev, phone_number: newValue }));
            }
          }}
        />
      )}
    </>
  );
};
