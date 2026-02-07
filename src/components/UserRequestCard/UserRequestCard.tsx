import './UserRequestCard.scss';
import type { HelpStatus } from '../../api/types/help';
import waitingIcon from '../../assets/Ellipse 3.png';
import progressIcon from '../../assets/ClockCountdown.svg';
import doneIcon from '../../assets/CheckCircle.svg';

type Props = {
  id: number;
  city: string;
  category: string;
  title: string;
  description: string;
  status: HelpStatus;
  onView: (id: number) => void;
};


export const statusIconMap: Record<HelpStatus, string> = {
  new: waitingIcon,
  in_progress: progressIcon,
  done: doneIcon,
};

export const statusLabelMap: Record<HelpStatus, string> = {
  new: 'New',
  in_progress: 'In progress',
  done: 'Done',
};

export const UserRequestCard = ({
  id,
  city,
  category,
  title,
  description,
  status,
  onView,
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
        <img src={statusIconMap[status]} alt={status} />
        <span>{statusLabelMap[status]}</span>
      </div>

      <div className='user-request-card__actions'>
        <button className='user-request-card__edit'>Edit Request</button>
        <button
          className='user-request-card__view'
          onClick={() => onView(id)}
        >
          View Details
        </button>
      </div>
    </div>
  );
};
