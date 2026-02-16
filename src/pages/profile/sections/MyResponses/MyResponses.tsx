import { useEffect, useState } from 'react';

import { getMyResponses } from '../../../../api/help.api';
import type { HelpRequest } from '../../../../api/types/help';
import { UserRequestCard } from '../../../../components/UserRequestCard/UserRequestCard';
import { useAuth } from '../../../../context/AuthContext';

import '../MyRequests/MyRequests.scss';

type Tab = 'active' | 'past';

export const MyResponses = () => {
  const { user } = useAuth();

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

  const handleDeleted = (deletedId: number) => {
    setResponses((prev) => prev.filter((r) => r.id !== deletedId));
  };

  const activeResponses = responses.filter((r) => r.status !== 'done');
  const pastResponses = responses.filter((r) => r.status === 'done');

  const filteredResponses = tab === 'active' ? activeResponses : pastResponses;

  if (loading) {
    return <div className='help-list'>Loading...</div>;
  }

  if (error) {
    return <div className='help-list'>{error}</div>;
  }

  if (responses.length === 0) {
    return (
      <div className='help-list help-list--empty'>
        <p className='help-list__empty'>
          You haven’t responded to any requests yet
        </p>
      </div>
    );
  }

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
            mode="volunteer"
            onDeleted={handleDeleted}
          />
        ))}
      </div>
    </div>
  );
};
