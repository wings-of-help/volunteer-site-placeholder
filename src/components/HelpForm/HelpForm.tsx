import { useEffect, useState } from 'react';
import { getCategories, getLocations } from '../../api/catalog.api';
import type { Category, Location } from '../../api/types/catalog';
import '../../components/CreateRequest/CreateRequest.scss';
import breakIcon from '../../assets/ep_arrow-left.svg';
import { createHelpRequest } from '../../api/helpCarts.api';
import { updateHelpRequest } from '../../api/help.api';
import { useNavigate } from 'react-router-dom';
import { CustomSearchDropdown } from '../UI-elements/CustomSearchDropdown/CustomSearchDropdown';

interface Props {
  mode: 'create' | 'edit';
  kind: 'request' | 'offer';
  initialData?: {
    id: number;
    title: string;
    description: string;
    category: number;
    location: number;
  };
}

export const HelpForm = ({ mode, kind, initialData }: Props) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  const [categories, setCategories] = useState<Category[]>([]);
  const [locations, setLocations] = useState<Location[]>([]);

  const [categoryId, setCategoryId] = useState<number | null>(null);
  const [locationId, setLocationId] = useState<number | null>(null);

  const navigate = useNavigate();

  // ===== PREFILL FOR EDIT =====
  useEffect(() => {
    if (mode === 'edit' && initialData) {
      setTitle(initialData.title);
      setDescription(initialData.description);
      setCategoryId(initialData.category);
      setLocationId(initialData.location);
    }
  }, [mode, initialData]);

  // ===== LOAD DATA =====
  useEffect(() => {
    const loadData = async () => {
      const [categoriesData, locationsData] = await Promise.all([
        getCategories(),
        getLocations(),
      ]);

      const sortedCategories = [...categoriesData].sort((a, b) => a.id - b.id);
      setCategories(sortedCategories);
      setLocations(locationsData);
    };

    loadData();
  }, []);

  const isChanged =
    mode === 'create' ||
    (initialData &&
      (title !== initialData.title ||
        description !== initialData.description ||
        categoryId !== initialData.category ||
        locationId !== initialData.location));

  // ===== OPTIONS =====
  const categoryOptions = categories.map((c) => ({
    label: c.name,
    value: c.id,
  }));
  const cityOptions = locations.map((c) => ({ label: c.name, value: c.id }));

  const selectedCategoryOption =
    categoryOptions.find((o) => o.value === categoryId) || null;

  const selectedCityOption =
    cityOptions.find((o) => o.value === locationId) || null;

  // ===== VALIDATION =====
  const isTitleValid = title.length > 0 && title.length <= 80;
  const isDescriptionValid =
    description.length >= 50 && description.length <= 1000;

  const isFormValid =
    isTitleValid && isDescriptionValid && categoryId && locationId && isChanged;

  const capitalizeFirstLetter = (value: string) =>
    value ? value[0].toUpperCase() + value.slice(1) : value;

  // ===== SUBMIT =====
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isFormValid) return;

    if (mode === 'create') {
      const created = await createHelpRequest({
        title,
        description,
        category: categoryId!,
        location: locationId!,
        kind,
      });

      navigate(`/${kind}s/${created.id}`, {
        state: { from: `/profile/${kind}s` + location.search },
      });
    } else {
      await updateHelpRequest(initialData!.id, {
        title,
        description,
        category: categoryId!,
        location: locationId!,
      });

      navigate(`/profile/${kind}s`, {
        state: { from: `/profile/${kind}s` },
      });
    }
  };

  return (
    <div className='create-request'>
      <div className='create-request__header'>
        <button
          className='create-request__back'
          onClick={() => navigate(`/profile/${kind}s`, {
            state: { from: `/profile/${kind}s` },
          })}
        >
          <img src={breakIcon} alt='back icon' />
          <span>Back to My {kind === 'request' ? 'Requests' : 'Offers'}</span>
        </button>

        <h1 className='create-request__title'>
          {mode === 'create'
            ? `Create New ${kind === 'request' ? 'Request' : 'Offer'}`
            : `Edit ${kind === 'request' ? 'Request' : 'Offer'}`}
        </h1>
      </div>

      <form className='create-request__form' onSubmit={handleSubmit}>
        <div className='create-request__field'>
          <label className='create-request__label'>Title</label>
          <input
            className='create-request__input'
            placeholder='Add title here...'
            value={title}
            maxLength={80}
            onChange={(e) => setTitle(capitalizeFirstLetter(e.target.value))}
          />

          <span className='create-request__hint'>
            Max length ~80 characters
          </span>
        </div>

        <div className='create-request__field'>
          <label className='create-request__label'>Category</label>
          <CustomSearchDropdown
            options={categoryOptions}
            selectedOption={selectedCategoryOption}
            onSelect={(o) => setCategoryId(Number(o.value))}
            placeholder='Choose a category'
          />
        </div>

        <div className='create-request__field'>
          <label className='create-request__label'>City</label>
          <CustomSearchDropdown
            options={cityOptions}
            selectedOption={selectedCityOption}
            onSelect={(o) => setLocationId(Number(o.value))}
            placeholder='Choose a city'
          />
        </div>

        <div className='create-request__field'>
          <label className='create-request__label'>Description</label>
          <textarea
            className='create-request__textarea'
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder={`Provide details about your ${kind}...`}
            onInput={(e) => {
              const el = e.currentTarget;
              el.style.height = 'auto';
              el.style.height = `${el.scrollHeight}px`;
            }}
          />

          <span className='create-request__hint'>
            {description.length} / 1000 characters (min 50)
          </span>
        </div>

        <div className='create-request__actions'>
          <button
            type='button'
            className='create-request__cancel'
            onClick={() => navigate(`/profile/${kind}s`, {
              state: { from: `/profile/${kind}s` },
            })}
          >
            Cancel
          </button>

          <button
            type='submit'
            className='create-request__publish'
            disabled={!isFormValid}
          >
            {mode === 'create' ? 'Publish' : 'Save Changes'}
          </button>
        </div>
      </form>
    </div>
  );
};
