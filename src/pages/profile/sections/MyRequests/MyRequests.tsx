import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../../../context/AuthContext';
import { getMyRequests } from '../../../../api/help.api';
import type { HelpRequest } from '../../../../api/types/help';

import { UserRequestCard } from '../../../../components/UserRequestCard/UserRequestCard';
import './MyRequests.scss';
import plusIcon from '../../../../assets/Plus.svg';
import { useTranslation } from 'react-i18next';

type Tab = 'active' | 'past';

interface Props {
  onCreate: () => void;
}

export const MyRequests = ({ onCreate }: Props) => {
  const {t} = useTranslation();
  const [tab, setTab] = useState<Tab>('active');
  const [requests, setRequests] = useState<HelpRequest[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const navigate = useNavigate();

  useEffect(() => {
    if (!user) return;
    
    const loadRequests = async () => {
      try {
        const data = await getMyRequests(user.id);
        setRequests(data);
      } catch (e) {
        setError('Failed to load requests');
      } finally {
        setLoading(false);
      }
    };

    loadRequests();
  }, []);

  const filteredRequests = requests.filter((request) =>
    tab === 'active' ? request.status !== 'done' : request.status === 'done',
  );

  if (loading) {
    return <div className='help-list'>Loading...</div>;
  }

  if (error) {
    return <div className='help-list'>{error}</div>;
  }

  const isEmpty = requests.length === 0;

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

      <div className='my-requests__tabs'>
        <button
          className={`my-requests__tab ${tab === 'active' ? 'my-requests__tab--active' : ''}`}
          onClick={() => setTab('active')}
        >
          {t("Active-Requests")}
        </button>

        <button
          className={`my-requests__tab ${tab === 'past' ? 'my-requests__tab--active' : ''}`}
          onClick={() => setTab('past')}
        >
          {t("Past Requests")}
        </button>
      </div>

      {isEmpty ? (
        <div className='help-list help-list--empty'>
          <p className='help-list__empty'>
            You haven’t created any requests yet
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
              onView={(id) =>
                navigate(`/requests/${id}`, {
                  state: { from: '/profile/requests' },
                })
              }
            />
          ))}
        </div>
      )}
    </div>
  );
};
