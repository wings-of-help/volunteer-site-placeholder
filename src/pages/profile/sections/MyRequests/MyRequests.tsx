import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../../../context/AuthContext';
import { getMyRequests } from '../../../../api/help.api';
// import type { HelpRequest } from '../../../../api/types/help';

import { UserRequestCard } from '../../../../components/UserRequestCard/UserRequestCard';
import './MyRequests.scss';
import plusIcon from '../../../../assets/Plus.svg';
import type { HelpCart } from '../../../../api/types/HelpCart';
import { useTranslation } from 'react-i18next';
import { TextLoader } from '../../../../components/TextLoader/TextLoader';

type Tab = 'active' | 'past';

export const MyRequests = () => {
  const { user } = useAuth();
  const {t} = useTranslation();
  const [tab, setTab] = useState<Tab>('active');
  const [requests, setRequests] = useState<HelpCart[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const navigate = useNavigate();

  useEffect(() => {
    if (!user) return;

    const loadRequests = async () => {
      try {
        const data = await getMyRequests(user.id);
        setRequests(data);
      } catch {
        setError('Failed to load requests');
      } finally {
        setTimeout(() => {
          setLoading(false);
        }, 1000)
      }
    };

    loadRequests();
  }, [user]);
  
  const filteredRequests = requests.filter((request) =>
    tab === 'active' ? request.status !== 'done' : request.status === 'done',
  );

  if (loading) {
    return <TextLoader/>;
  }

  if (error) {
    return <div className='help-list'>{error}</div>;
  }

  const isEmpty = requests.length === 0;

  const handleStatusChanged = (id: number) => {
    setRequests((prev) =>
      prev.map((r) => (r.id === id ? { ...r, status: 'done' } : r)),
    );
  };

  return (
    <div className='help-list'>
      <div className='help-list__header'>
        <button
          className='help-list__create-btn'
          onClick={() => navigate('/profile/requests/new')}
        >
          <img src={plusIcon} alt='' />
          <span>{t("Create-New-Request")}</span>
        </button>
      </div>

      {!isEmpty && (
        <div className='help-list__tabs'>
          <button
            className={`help-list__tab ${
              tab === 'active' ? 'help-list__tab--active' : ''
            }`}
            onClick={() => setTab('active')}
          >
            {t("Active-Requests")}
          </button>

          <button
            className={`help-list__tab ${
              tab === 'past' ? 'help-list__tab--active' : ''
            }`}
            onClick={() => setTab('past')}
          >
            {t("Past-Requests")}
          </button>
        </div>
      )}

      {isEmpty ? (
        <div className='help-list help-list--empty'>
          <p className='help-list__empty'>
            {t("You-haven’t-created-any-requests-yet")}
          </p>
        </div>
      ) : (
        <div className='help-list__list'>
          {filteredRequests.map((request) => (
            <UserRequestCard
              key={request.id}
              id={request.id}
              city={request.location_name}
              category={request.category_name}
              title={request.title}
              description={request.description}
              status={request.status}
              mode='owner-request'
              kind='request'
              onDeleted={(id) => {
                setRequests((prev) => prev.filter((item) => item.id !== id));
              }}
              onCompleted={handleStatusChanged}
            />
          ))}
        </div>
      )}
    </div>
  );
};
