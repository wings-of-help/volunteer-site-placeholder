import { useState } from 'react';
import { mockRequests } from '../../../../api/requests.mock';
import { UserRequestCard } from '../../../../components/UserRequestCard/UserRequestCard';
import './MyRequests.scss';
import plusIcon from '../../../../assets/Plus.svg';

type Tab = 'active' | 'past';

interface Props {
  onCreate: () => void;
}

export const MyRequests = ({ onCreate }: Props) => {
  const [tab, setTab] = useState<Tab>('active');

  const filteredRequests = mockRequests.filter((request) =>
    tab === 'active'
      ? request.status !== 'Completed'
      : request.status === 'Completed',
  );

  return (
    <div className='my-requests'>
      <div className='my-requests__header'>
        <button className='my-requests__create-btn' onClick={onCreate}>
          <img src={plusIcon} alt='' />
          <span>Create New Request</span>
        </button>
      </div>

      <div className='my-requests__tabs'>
        <button
          className={`my-requests__tab ${tab === 'active' ? 'my-requests__tab--active' : ''}`}
          onClick={() => setTab('active')}
        >
          Active Requests
        </button>

        <button
          className={`my-requests__tab ${tab === 'past' ? 'my-requests__tab--active' : ''}`}
          onClick={() => setTab('past')}
        >
          Past Requests
        </button>
      </div>

      <div className='my-requests__list'>
        {filteredRequests.map((request) => (
          <UserRequestCard
            key={request.id}
            city={request.city}
            category={request.category}
            title={request.title}
            description={request.description}
            status={request.status}
          />
        ))}
      </div>
    </div>
  );
};
