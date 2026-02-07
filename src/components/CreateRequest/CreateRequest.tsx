import { useEffect, useState, useRef } from 'react';
import { getCategories, getLocations } from '../../api/catalog.api';
import type { Category, Location } from '../../api/types/catalog';
import './CreateRequest.scss';
import breakIcon from '../../assets/ep_arrow-left.svg';
import { useTranslation } from 'react-i18next';

interface Props {
  onBack: () => void;
}

export const CreateRequest = ({ onBack }: Props) => {
  const {t} = useTranslation();
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  const [categories, setCategories] = useState<Category[]>([]);
  const [locations, setLocations] = useState<Location[]>([]);

  const [cityOpen, setCityOpen] = useState(false);
  const [categoryOpen, setCategoryOpen] = useState(false);

  const [categoryId, setCategoryId] = useState<number | null>(null);
  const [locationId, setLocationId] = useState<number | null>(null);
  const categoryDropdownRef = useRef<HTMLDivElement | null>(null);
  const cityDropdownRef = useRef<HTMLDivElement | null>(null);

  const selectedCity = locationId
    ? locations.find((c) => c.id === locationId)
    : null;

  const selectedCategory = categoryId
    ? categories.find((c) => c.id === categoryId)
    : null;

  const navigate = useNavigate();

  useEffect(() => {
    const loadData = async () => {
      try {
        const [categoriesData, locationsData] = await Promise.all([
          getCategories(),
          getLocations(),
        ]);

        const sortedCategories = [...categoriesData].sort(
          (a, b) => a.id - b.id,
        );

        const sortedLocations = [...locationsData].sort((a, b) =>
          a.name.localeCompare(b.name),
        );

        setCategories(sortedCategories);
        setLocations(sortedLocations);
      } catch (error) {
        console.error('Failed to load catalog data', error);
      }
    };

    loadData();
  }, []);

  // --- validation ---
  const isTitleValid = title.length > 0 && title.length <= 80;
  const isDescriptionValid =
    description.length >= 50 && description.length <= 1000;

  const isFormValid =
    isTitleValid &&
    isDescriptionValid &&
    categoryId !== null &&
    locationId !== null;

  const capitalizeFirstLetter = (value: string) =>
    value ? value[0].toUpperCase() + value.slice(1) : value;

  // --- submit ---
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!isFormValid) return;

    try {
      console.log({
        title,
        description,
        categoryId,
        locationId,
      });

      const created = await createHelpRequest({
        title,
        description,
        category: categoryId!,
        location: locationId!,
        kind: 'request',
      });

      console.log('Request created:', created);

      navigate(`/requests/${created.id}`);
    } catch (error) {
      console.error('Failed to create request', error);
    }
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Node;

      if (
        categoryDropdownRef.current &&
        !categoryDropdownRef.current.contains(target)
      ) {
        setCategoryOpen(false);
      }

      if (
        cityDropdownRef.current &&
        !cityDropdownRef.current.contains(target)
      ) {
        setCityOpen(false);
      }
    };

    document.addEventListener('click', handleClickOutside);

    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, []);

  return (
    <div className='create-request'>
      <div className='create-request__header'>
        <button
          className='create-request__back'
          onClick={() => navigate('/profile/requests')}
        >
          <img src={breakIcon} alt='back icon' />
          <span>{t("Back-to-My-Requests")}</span>
        </button>

        <h1 className='create-request__title'>{t("Create-New-Request")}</h1>
      </div>

      <form className='create-request__form' onSubmit={handleSubmit}>
        {/* TITLE */}
        <div className='create-request__field'>
          <label className='create-request__label'>{t("Title")}</label>
          <input
            className='create-request__input'
            placeholder={t('Add-title-here')}
            value={title}
            maxLength={80}
            onChange={(e) => setTitle(capitalizeFirstLetter(e.target.value))}
          />
          <span className='create-request__hint'>
            {t("Max-length-80-characters")}
          </span>
        </div>

        {/* CATEGORY */}
        <div className='create-request__field'>
          <label className='create-request__label'>{t("Category")}</label>
          <select className='create-request__select'>
            <option value=''>{t("Choose-a-category")}</option>
            // Буде заповнено динамічно пізніше
            <option value='medicine'>Medicine</option>
            <option value='food'>Food</option>
          </select>
        </div>

        {/* CITY */}
        <div className='create-request__field'>
          <label className='create-request__label'>{t("City")}</label>
          <select className='create-request__select'>
            <option value=''>Choose a city</option>
            // Буде заповнено динамічно пізніше
            <option value='Kyiv'>Kyiv</option>
            <option value='Lviv'>Lviv</option>
          </select>
        </div>

        {/* DESCRIPTION */}
        <div className='create-request__field'>
          <label className='create-request__label'>{t("Description")}</label>
          <textarea
            className='create-request__textarea'
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder='Provide details about your request...'
            onInput={(e) => {
              const el = e.currentTarget;
              el.style.height = 'auto';
              el.style.height = `${el.scrollHeight}px`;
            }}
          />
          <span className='create-request__hint'>
            {description.length} {t("/1000-characters-(min 500)")}
          </span>
        </div>

        {/* ACTIONS */}
        <div className='create-request__actions'>
          <button type='button' className='create-request__cancel'>
            {t("Cancel")}
          </button>

          <button
            type='submit'
            className={`create-request__publish ${
              isFormValid ? 'create-request__publish--active' : ''
            }`}
            disabled={!isFormValid}
          >
            {t("Publish")}
          </button>
        </div>
      </form>
    </div>
  );
};
