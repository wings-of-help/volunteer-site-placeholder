import './UserRequestCard.scss';
import type { HelpStatus } from '../../api/types/help';
import waitingIcon from '../../assets/Ellipse 3.png';
import progressIcon from '../../assets/ClockCountdown.svg';
import doneIcon from '../../assets/CheckCircle.svg';
import { useState } from 'react';
import { ConfirmModal } from '../../components/ConfirmModal/ConfirmModal';
import { completeHelpRequest, deleteHelpRequest } from '../../api/help.api';
import garbageIcon from '../../assets/garbage.svg';
import trashIcon from '../../assets/Trash.svg';
import { Link, useLocation } from 'react-router-dom';

type Props = {
  id: number;
  city: string;
  category: string;
  title: string;
  description: string;
  status: HelpStatus;
  onDeleted: (id: number) => void;
};

/* ===== STATUS MAPS ===== */

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

/* ===== COMPONENT ===== */

export const UserRequestCard = ({
  id,
  city,
  category,
  title,
  description,
  status,
  onDeleted,
}: Props) => {
  const [isDoneModalOpen, setIsDoneModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  const location = useLocation();
  const path = location.pathname;
  const basePath = path.includes('offers') ? 'offers' : 'requests';

  /* ===== DELETE ===== */

  const handleDelete = async () => {
    try {
      await deleteHelpRequest(id);
      onDeleted(id);
      setIsDeleteModalOpen(false);
    } catch (error) {
      console.error('Failed to delete request', error);
    }
  };

  /* ===== MARK DONE ===== */

  const handleMarkDone = async () => {
    try {
      await completeHelpRequest(id);
      setIsDoneModalOpen(false);
    } catch (error) {
      console.error('Failed to mark request as done', error);
    }
  };

  return (
    <>
      <div className='user-request-card'>
        <Link
          to={`/${basePath}/${id}`}
          state={{ from: location.pathname }}
          className='link-wrapper'
        >
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
        </Link>
        <div className='user-request-card__actions'>
          <button className='user-request-card__edit'>Edit Request</button>

          <button
            className='user-request-card__view'
            onClick={() => setIsDoneModalOpen(true)}
          >
            Mark as Done
          </button>

          <button
            className='user-request-card__delete'
            type='button'
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              setIsDeleteModalOpen(true);
            }}
          >
            <img src={garbageIcon} alt='Delete request' />
          </button>
        </div>
      </div>

      {/* ===== DONE MODAL ===== */}

      {isDoneModalOpen && (
        <ConfirmModal
          title='Are you sure you want to mark this request as done?'
          description={
            <>
              This action{' '}
              <span className='confirm-modal__warning'>cannot be undone.</span>
            </>
          }
          confirmText='Yes, mark as done'
          onCancel={() => setIsDoneModalOpen(false)}
          onConfirm={handleMarkDone}
        />
      )}

      {/* ===== DELETE MODAL ===== */}

      {isDeleteModalOpen && (
        <ConfirmModal
          title='Are you sure you want to delete this post?'
          confirmText='Delete'
          cancelText='Cancel'
          variant='danger'
          icon={trashIcon}
          onCancel={() => setIsDeleteModalOpen(false)}
          onConfirm={handleDelete}
        />
      )}
    </>
  );
};
