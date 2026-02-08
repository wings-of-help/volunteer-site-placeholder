import { useEffect, useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { getCategories, getLocations } from '../../api/catalog.api';
import { createHelpRequest } from '../../api/helpCarts.api';
import type { Category, Location } from '../../api/types/catalog';
import '../CreateRequest/CreateRequest.scss';
import breakIcon from '../../assets/ep_arrow-left.svg';

export const CreateOffer = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  const [categories, setCategories] = useState<Category[]>([]);
  const [locations, setLocations] = useState<Location[]>([]);

  const [categoryOpen, setCategoryOpen] = useState(false);
  const [cityOpen, setCityOpen] = useState(false);

  const [categoryId, setCategoryId] = useState<number | null>(null);
  const [locationId, setLocationId] = useState<number | null>(null);

  const categoryDropdownRef = useRef<HTMLDivElement | null>(null);
  const cityDropdownRef = useRef<HTMLDivElement | null>(null);

  const navigate = useNavigate();

  const selectedCategory = categoryId
    ? categories.find((c) => c.id === categoryId)
    : null;

  const selectedCity = locationId
    ? locations.find((l) => l.id === locationId)
    : null;

  // --- load catalog ---
  useEffect(() => {
    const loadData = async () => {
      try {
        const [categoriesData, locationsData] = await Promise.all([
          getCategories(),
          getLocations(),
        ]);

        setCategories(categoriesData);
        setLocations(locationsData);
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
      const created = await createHelpRequest({
        title,
        description,
        category: categoryId!,
        location: locationId!,
        kind: 'offer',
      });

      navigate(`/offers/${created.id}`);
    } catch (error) {
      console.error('Failed to create offer', error);
    }
  };

  // --- close dropdowns on outside click ---
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

  return (
    <div className='create-request'>
      <div className='create-request__header'>
        <button
          className='create-request__back'
          onClick={() => navigate('/profile/offers')}
        >
          <img src={breakIcon} alt='back icon' />
          <span>Back to My Offers</span>
        </button>

        <h1 className='create-request__title'>Create New Offer</h1>
      </div>

      <form className='create-request__form' onSubmit={handleSubmit}>
        {/* TITLE */}
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

        {/* CATEGORY */}
        <div className='create-request__field'>
          <label className='create-request__label'>Category</label>

          <div className='create-request__dropdown' ref={categoryDropdownRef}>
            <button
              type='button'
              className='create-request__select'
              onClick={() => setCategoryOpen((prev) => !prev)}
            >
              {selectedCategory?.name || 'Choose a category'}
            </button>

            {categoryOpen && (
              <ul className='create-request__dropdown-list'>
                {categories.map((category) => (
                  <li
                    key={category.id}
                    className='create-request__dropdown-item'
                    onClick={() => {
                      setCategoryId(category.id);
                      setCategoryOpen(false);
                    }}
                  >
                    {category.name}
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>

        {/* CITY */}
        <div className='create-request__field'>
          <label className='create-request__label'>City</label>

          <div className='create-request__dropdown' ref={cityDropdownRef}>
            <button
              type='button'
              className='create-request__select'
              onClick={() => setCityOpen((prev) => !prev)}
            >
              {selectedCity?.name || 'Choose a city'}
            </button>

            {cityOpen && (
              <ul className='create-request__dropdown-list'>
                {locations.map((city) => (
                  <li
                    key={city.id}
                    className='create-request__dropdown-item'
                    onClick={() => {
                      setLocationId(city.id);
                      setCityOpen(false);
                    }}
                  >
                    {city.name}
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>

        {/* DESCRIPTION */}
        <div className='create-request__field'>
          <label className='create-request__label'>Description</label>
          <textarea
            className='create-request__textarea'
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder='Provide details about your offer, including number of people affected, urgency, and any special needs'
          />
          <span className='create-request__hint'>
            {description.length} / 1000 characters (min 50)
          </span>
        </div>

        {/* ACTIONS */}
        <div className='create-request__actions'>
          <button
            type='button'
            className='create-request__cancel'
            onClick={() => navigate('/profile/offers')}
          >
            Cancel
          </button>

          <button
            type='submit'
            className={`create-request__publish ${
              isFormValid ? 'create-request__publish--active' : ''
            }`}
            disabled={!isFormValid}
          >
            Publish
          </button>
        </div>
      </form>
    </div>
  );
};
