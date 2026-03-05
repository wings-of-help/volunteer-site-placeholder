import type { HelpStatus } from '../../../api/types/help';
import './StatusBlock.scss';
import waitingIcon from '../../../assets/Ellipse 3.png';
import progressIcon from '../../../assets/in-progress-іcon.svg';
import doneIcon from '../../../assets/done-icon.svg';

type Props = {
  status: HelpStatus;
};

export default function StatusBlock({ status }: Props) {
  const statusIconMap: Record<HelpStatus, string> = {
    new: waitingIcon,
    in_progress: progressIcon,
    done: doneIcon,
  };

  const statusLabelMap: Record<HelpStatus, string> = {
    new: 'New',
    in_progress: 'In progress',
    done: 'Done',
  };

  return (
    <div
      className={`user-request-card__status user-request-card__status--${status}`}
    >
      {status === 'new' ? (
        <span className='user-request-card__status-dot' />
      ) : (
        <img
          src={statusIconMap[status]}
          alt={status}
          className='user-request-card__status-icon'
        />
      )}
      <span>{statusLabelMap[status]}</span>
    </div>
  );
}
