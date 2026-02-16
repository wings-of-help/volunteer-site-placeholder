import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../../../context/AuthContext';
import { getMyOffers } from '../../../../api/help.api';
import type { HelpRequest } from '../../../../api/types/help';

import { UserRequestCard } from '../../../../components/UserRequestCard/UserRequestCard';
import '../MyRequests/MyRequests.scss';
import plusIcon from '../../../../assets/Plus.svg';

type Tab = 'active' | 'past';

export const MyOffers = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  const [tab, setTab] = useState<Tab>('active');
  const [offers, setOffers] = useState<HelpRequest[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  /* ===== LOAD DATA ===== */
  useEffect(() => {
    if (!user) return;

    const loadOffers = async () => {
      try {
        const data = await getMyOffers(user.id);
        setOffers(data);
      } catch {
        setError('Failed to load offers');
      } finally {
        setLoading(false);
      }
    };

    loadOffers();
  }, [user]);

  /* ===== DELETE HANDLER ===== */
  const handleDeleted = (deletedId: number) => {
    setOffers(prev => prev.filter(o => o.id !== deletedId));
  };

  /* ===== FILTER ===== */
  const filteredOffers = offers.filter(offer =>
    tab === 'active' ? offer.status !== 'done' : offer.status === 'done'
  );

  /* ===== STATES ===== */
  if (loading) return <div className='help-list'>Loading...</div>;
  if (error) return <div className='help-list'>{error}</div>;

  const isEmpty = offers.length === 0;

  return (
    <div className='help-list'>
      {/* HEADER */}
      <div className='help-list__header'>
        <button
          className='help-list__create-btn'
          onClick={() => navigate('/profile/offers/new')}
        >
          <img src={plusIcon} alt='' />
          <span>Create New Offer</span>
        </button>
      </div>

      {/* EMPTY */}
      {isEmpty ? (
        <div className='help-list help-list--empty'>
          <p className='help-list__empty'>You haven’t created any offers yet</p>
        </div>
      ) : (
        <>
          {/* TABS */}
          <div className='help-list__tabs'>
            <button
              className={`help-list__tab ${
                tab === 'active' ? 'help-list__tab--active' : ''
              }`}
              onClick={() => setTab('active')}
            >
              Active Offers
            </button>

            <button
              className={`help-list__tab ${
                tab === 'past' ? 'help-list__tab--active' : ''
              }`}
              onClick={() => setTab('past')}
            >
              Past Offers
            </button>
          </div>

          {/* LIST */}
          <div className='help-list__list'>
            {filteredOffers.map((offer) => (
              <UserRequestCard
                key={offer.id}
                id={offer.id}
                city={offer.location_name}
                category={offer.category_name}
                title={offer.title}
                description={offer.description}
                status={offer.status}
                mode="owner-offer"
                onDeleted={handleDeleted}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
};
