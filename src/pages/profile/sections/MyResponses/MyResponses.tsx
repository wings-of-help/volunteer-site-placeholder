import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { getMyResponses } from '../../../../api/help.api';
import type { HelpRequest } from '../../../../api/types/help';
import { UserRequestCard } from '../../../../components/UserRequestCard/UserRequestCard';
import { useAuth } from '../../../../context/AuthContext';

import '../MyRequests/MyRequests.scss';

type Tab = 'active' | 'past';

export const MyResponses = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  const [tab, setTab] = useState<Tab>('active');
  const [responses, setResponses] = useState<HelpRequest[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!user) return;

    const loadResponses = async () => {
      try {
        const data = await getMyResponses(user.id);
        setResponses(data);
      } catch {
        setError('Failed to load responses');
      } finally {
        setLoading(false);
      }
    };

    loadResponses();
  }, [user]);

  const filteredResponses = responses.filter((item) =>
    tab === 'active' ? item.status !== 'done' : item.status === 'done',
  );
  
  if (loading) {
    return <div className='help-list'>Loading...</div>;
  }

  if (error) {
    return <div className='help-list'>{error}</div>;
  }

  /* EMPTY STATE — без табов */
  if (responses.length === 0) {
    return (
      <div className='help-list help-list--empty'>
        <p className='help-list__empty'>You haven’t requested help yet</p>
      </div>
    );
  }

  /* якщо є responses */
  return (
    <div className='help-list'>
      <div className='help-list__tabs'>
        <button
          className={`help-list__tab ${
            tab === 'active' ? 'help-list__tab--active' : ''
          }`}
          onClick={() => setTab('active')}
        >
          Active Responses
        </button>

        <button
          className={`help-list__tab ${
            tab === 'past' ? 'help-list__tab--active' : ''
          }`}
          onClick={() => setTab('past')}
        >
          Past Responses
        </button>
      </div>

      <div className='help-list__list'>
        {filteredResponses.map((response) => (
          <UserRequestCard
            key={response.id}
            id={response.id}
            city={response.location_name}
            category={response.category_name}
            title={response.title}
            description={response.description}
            status={response.status}
            onView={(id) =>
              navigate(`/requests/${id}`, {
                state: { from: '/profile/responses' },
              })
            }
          />
        ))}
      </div>
    </div>
  );
};
