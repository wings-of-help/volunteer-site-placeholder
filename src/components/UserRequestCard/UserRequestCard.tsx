import './UserRequestCard.scss';
import type { HelpStatus } from '../../api/types/help';
import waitingIcon from '../../assets/Ellipse 3.png';
import progressIcon from '../../assets/in-progress-іcon.svg';
import doneIcon from '../../assets/done-icon.svg';
import { useState, useRef } from 'react';
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
  const ignoreNextClick = useRef(false);

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
        {/* CARD LINK */}
        <Link
          to={`/${basePath}/${id}`}
          state={{ from: location.pathname }}
          className='user-request-card__card'
          onClick={(e) => {
            if (ignoreNextClick.current) {
              e.preventDefault();
              ignoreNextClick.current = false;
            }
          }}
        >
          <div className='user-request-card__content'>
            <h3 className='user-request-card__title'>{title}</h3>

            <div className='user-request-card__tag'>{category}</div>

            <p className='user-request-card__description'>{description}</p>
          </div>
          <div className='user-request-card__footer'>
            <span className='user-request-card__city'>{city}</span>
            <div
              className={`user-request-card__status user-request-card__status--${status}`}
            >
              {status === 'new' && (
                <span className='user-request-card__status-dot' />
              )}

              {status !== 'new' && (
                <img src={statusIconMap[status]} alt={status} />
              )}
              <span>{statusLabelMap[status]}</span>
            </div>
          </div>{' '}
          <div className='user-request-card__actions'>
            <button
              className='user-request-card__edit'
              type='button'
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                ignoreNextClick.current = true;
                // TODO: edit logic later
              }}
            >
              Edit Request
            </button>

            <button
              className='user-request-card__view'
              type='button'
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                ignoreNextClick.current = true;
                setIsDoneModalOpen(true);
              }}
            >
              Mark as Done
            </button>

            <button
              className='user-request-card__delete'
              type='button'
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                ignoreNextClick.current = true;
                setIsDeleteModalOpen(true);
              }}
            >
              <img src={garbageIcon} alt='Delete request' />
            </button>
          </div>
        </Link>

        {/* DONE MODAL */}
        {isDoneModalOpen && (
          <ConfirmModal
            title='Are you sure you want to mark this request as done?'
            description={
              <>
                This action{' '}
                <span className='confirm-modal__warning'>
                  cannot be undone.
                </span>
              </>
            }
            confirmText='Yes, mark as done'
            onCancel={() => setIsDoneModalOpen(false)}
            onConfirm={handleMarkDone}
          />
        )}
        {/* DELETE MODAL */}
        {isDeleteModalOpen && (
          <ConfirmModal
            title='Are you sure you want to delete this post?'
            confirmText='Delete'
            cancelText='Cancel'
            variant='danger'
            icon={trashIcon}
            onCancel={() => {
              ignoreNextClick.current = true;
              setIsDeleteModalOpen(false);
            }}
            onConfirm={handleDelete}
          />
        )}
      </div>
    </>
  );
};
