import './UserRequestCard.scss';
import type { RequestStatus } from '../../../src/api/types/request';
import waitingIcon from '../../assets/Hourglass.svg';
import progressIcon from '../../assets/ClockCountdown.svg';
import doneIcon from '../../assets/CheckCircle.svg';

type Props = {
  city: string;
  category: string;
  title: string;
  description: string;
  status: RequestStatus;
};

export const statusIconMap: Record<RequestStatus, string> = {
  Available: waitingIcon,
  'In progress': progressIcon,
  Completed: doneIcon,
};

export const statusLabelMap: Record<RequestStatus, string> = {
  Available: 'Waiting for help',
  'In progress': 'In progress',
  Completed: 'Completed',
};

export const UserRequestCard = ({
  city,
  category,
  title,
  description,
  status,
}: Props) => {
  return (
    <div className='user-request-card'>
      <div className='user-request-card__header'>
        <span className='user-request-card__city'>{city}</span>
        <span className='user-request-card__category'>{category}</span>
      </div>

      <h3 className='user-request-card__title'>{title}</h3>
      <p className='user-request-card__description'>{description}</p>

      <div className='user-request-card__status'>
        <img
          src={statusIconMap[status]}
          alt={status}
          className='user-request-card__status-icon'
        />
        <span className='user-request-card__status-text'>
          {statusLabelMap[status]}
        </span>
      </div>

      <div className='user-request-card__actions'>
        <button className='user-request-card__edit'>Edit Request</button>
        <button className='user-request-card__view'>View Details</button>
      </div>
    </div>
  );
};
