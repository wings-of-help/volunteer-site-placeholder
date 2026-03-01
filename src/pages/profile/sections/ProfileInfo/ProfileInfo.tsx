import { useState, useEffect } from 'react';
import { ProfileModal } from '../../ProfileModal/ProfileModal';
import { useAuth } from '../../../../context/AuthContext';
import { updateMyProfileRequest } from '../../../../api/user.api';
import { formatPhoneForDisplay } from '../../../../utils/phone';
import { ProfilePasswordModal } from '../../../../components/ProfilePasswordModal/ProfilePasswordModal';
import { changePasswordRequest } from '../../../../api/user.api';
import './ProfileInfo.scss';
import { useTranslation } from 'react-i18next';

export const ProfileInfo = () => {
  const { user, getMyProfile } = useAuth();
  const { t } = useTranslation();

  if (!user) {
    return null;
  }

  const [originalUser, setOriginalUser] = useState(user);
  const [form, setForm] = useState(user);

  const [activeModal, setActiveModal] = useState<
    null | 'email' | 'phone' | 'password'
  >(null);

  const isDirty =
    form.first_name !== originalUser.first_name ||
    form.last_name !== originalUser.last_name;

  const capitalize = (value: string) => {
    if (!value) return value;
    return value.charAt(0).toUpperCase() + value.slice(1);
  };

  useEffect(() => {
    if (!user) return;

    setForm(user);
    setOriginalUser(user);
  }, [user]);

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

  const handleContactChange = async (
    type: 'email' | 'phone',
    newValue: string,
  ) => {
    if (!user) return;
    try {
      const payload = {
        ...(type === 'email' ? { email: newValue } : {}),
        ...(type === 'phone' ? { phone_number: newValue } : {}),
      };

      await updateMyProfileRequest(user.id, payload);
      await getMyProfile();
    } catch (error) {
      console.error('Failed to update profile', error);
      throw error;
    }
  };

  const handleModalSuccess = async (value: any) => {
    if (!activeModal || !user) return;

    if (activeModal === 'email' || activeModal === 'phone') {
      await handleContactChange(activeModal, value);
    }

    if (activeModal === 'password') {
      await changePasswordRequest({
        old_password: value.oldPassword,
        new_password: value.newPassword,
      });
    }

    await getMyProfile();
  };

  return (
    <>
      <div className='profile__card'>
        <div className='profile__header'>
          <h1 className='profile__title'>{t('Profile')}</h1>
        </div>

        <div className='profile__form'>
          <label className='profile__field'>
            <span className='profile__label'>{t('First-name')}</span>
            <input
              className='profile__input'
              value={form.first_name}
              onChange={(e) =>
                setForm({ ...form, first_name: capitalize(e.target.value) })
              }
            />
          </label>

          <label className='profile__field'>
            <span className='profile__label'>{t('Last-name')}</span>
            <input
              className='profile__input'
              value={form.last_name}
              onChange={(e) =>
                setForm({ ...form, last_name: capitalize(e.target.value) })
              }
            />
          </label>

          <div className='profile__role'>
            <span className='profile__role-label'>{t('Role')}</span>
            <span className='profile__role-value'>
              {' '}
              {t(`roles.${user.role}`)}
            </span>
          </div>

          <div className='profile__actions'>
            <button
              className={`profile__save-btn ${
                isDirty ? 'profile__save-btn--active' : ''
              }`}
              disabled={!isDirty}
              onClick={handleSave}
            >
              {t('Save-changes')}
            </button>
          </div>
        </div>

        <div className='profile__contacts'>
          <h2 className='profile__contacts-title'>
            {t('Contact Information')}
          </h2>

          <div className='profile__contact-row'>
            <div className='profile__contact-field'>
              <span className='profile__contact-label'>{t('Email')}</span>
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
              {t('Change')}
            </button>
          </div>

          <div className='profile__contact-row'>
            <div className='profile__contact-field'>
              <span className='profile__contact-label'>
                {t('Phone-number')}
              </span>
              <input
                className='profile__contact-input'
                disabled
                value={formatPhoneForDisplay(form.phone_number)}
              />
            </div>
            <button
              className='profile__contact-btn'
              onClick={() => setActiveModal('phone')}
            >
              {t('Change')}
            </button>
          </div>

          <div className='profile__contact-row'>
            <div className='profile__contact-field'>
              <span className='profile__contact-label'>{t('Password')}</span>
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
              {t('Change')}
            </button>
          </div>
        </div>
      </div>

      {(activeModal === 'email' || activeModal === 'phone') && (
        <ProfileModal
          type={activeModal}
          onClose={() => setActiveModal(null)}
          onSuccess={handleModalSuccess}
        />
      )}

      {activeModal === 'password' && (
        <ProfilePasswordModal
          onClose={() => setActiveModal(null)}
          onConfirm={handleModalSuccess}
        />
      )}
    </>
  );
};
