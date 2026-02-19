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
import { Link, useLocation, useNavigate } from 'react-router-dom';
import StatusBlock from '../UI-elements/StatusBlock/StatusBlock';

type CardMode = 'owner-request' | 'owner-offer' | 'volunteer' | 'catalog';

type Props = {
  id: number;
  city: string;
  category: string;
  title: string;
  description: string;
  status: HelpStatus;

  kind: 'request' | 'offer';

  mode?: CardMode;
  onDeleted?: (id: number) => void;
  onCompleted?: (id: number) => void;
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
  mode = 'catalog',
  kind,
  onDeleted,
  onCompleted,
}: Props) => {
  const [isDoneModalOpen, setIsDoneModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [localStatus, setLocalStatus] = useState(status);

  const ignoreNextClick = useRef(false);

  const navigate = useNavigate();
  const location = useLocation();

  const canMarkDone = localStatus === 'in_progress';

  /* ===== DEFINE BASE PATH ===== */
  const basePath = kind === 'offer' ? 'offers' : 'requests';

  /* ===== DELETE ===== */

  const handleDelete = async () => {
    try {
      await deleteHelpRequest(id);
      onDeleted?.(id);
      setIsDeleteModalOpen(false);
    } catch (error) {
      console.error('Failed to delete request', error);
    }
  };

  /* ===== MARK DONE ===== */

  const handleMarkDone = async () => {
    try {
      setLocalStatus('done');
      setIsDoneModalOpen(false);

      await completeHelpRequest(id);

      onCompleted?.(id);
    } catch (error) {
      console.error('Failed to mark request as done', error);
      setLocalStatus(status);
    }
  };

  const isOwner = mode === 'owner-request' || mode === 'owner-offer';

  const rootFrom =
  (location.state as { from?: string })?.from ??
  location.pathname + location.search;

  console.log("root", rootFrom);
  

  return (
    <>
      <div className='user-request-card'>
        {/* CARD LINK */}
        <Link
          to={`/${basePath}/${id}`}
          state={{ from: rootFrom }}
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

            <StatusBlock status={localStatus}/>
          </div>

          {/* ===== ACTIONS ONLY FOR OWNER ===== */}
          {isOwner && (
            <div className='user-request-card__actions'>
              <button
                className='user-request-card__edit'
                type='button'
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  ignoreNextClick.current = true;
                  navigate(`/profile/${basePath}/${id}/edit`);
                }}
              >
                Edit Request
              </button>

              <button
                className='user-request-card__view'
                type='button'
                disabled={!canMarkDone}
                onClick={(e) => {
                  if (!canMarkDone) return;

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
          )}
        </Link>

        {/* DONE MODAL */}
        {isOwner && isDoneModalOpen && (
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
        {isOwner && isDeleteModalOpen && (
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
