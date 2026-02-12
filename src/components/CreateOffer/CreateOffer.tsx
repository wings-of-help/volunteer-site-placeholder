import { useEffect, useState } from 'react';
import { getCategories, getLocations } from '../../api/catalog.api';
import type { Category, Location } from '../../api/types/catalog';
import '../CreateRequest/CreateRequest.scss';
import breakIcon from '../../assets/ep_arrow-left.svg';
import { createHelpRequest } from '../../api/helpCarts.api';
import { useNavigate } from 'react-router-dom';
import { CustomSearchDropdown } from '../UI-elements/CustomSearchDropdown/CustomSearchDropdown';

export const CreateOffer = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  const [categories, setCategories] = useState<Category[]>([]);
  const [locations, setLocations] = useState<Location[]>([]);

  const [categoryId, setCategoryId] = useState<number | null>(null);
  const [locationId, setLocationId] = useState<number | null>(null);

  const navigate = useNavigate();

  // ================= LOAD DATA =================
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

        setCategories(sortedCategories);
        setLocations(locationsData);
      } catch (error) {
        console.error('Failed to load catalog data', error);
      }
    };

    loadData();
  }, []);

  // ================= OPTIONS =================

  const categoryOptions = categories.map((category) => ({
    label: category.name,
    value: category.id,
  }));

  const cityOptions = locations.map((city) => ({
    label: city.name,
    value: city.id,
  }));

  const selectedCategoryOption =
    categoryOptions.find((option) => option.value === categoryId) || null;

  const selectedCityOption =
    cityOptions.find((option) => option.value === locationId) || null;

  // ================= VALIDATION =================

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

  // ================= SUBMIT =================

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

  return (
    <div className="create-request">
      <div className="create-request__header">
        <button
          className="create-request__back"
          onClick={() => navigate('/profile/offers')}
        >
          <img src={breakIcon} alt="back icon" />
          <span>Back to My Offers</span>
        </button>

        <h1 className="create-request__title">Create New Offer</h1>
      </div>

      <form className="create-request__form" onSubmit={handleSubmit}>
        {/* TITLE */}
        <div className="create-request__field">
          <label className="create-request__label">Title</label>
          <input
            className="create-request__input"
            placeholder="Add title here..."
            value={title}
            maxLength={80}
            onChange={(e) =>
              setTitle(capitalizeFirstLetter(e.target.value))
            }
          />
          <span className="create-request__hint">
            Max length ~80 characters
          </span>
        </div>

        {/* CATEGORY */}
        <div className="create-request__field">
          <label className="create-request__label">Category</label>

          <CustomSearchDropdown
            options={categoryOptions}
            selectedOption={selectedCategoryOption}
            onSelect={(option) =>
              setCategoryId(Number(option.value))
            }
            placeholder="Choose a category"
          />
        </div>

        {/* CITY */}
        <div className="create-request__field">
          <label className="create-request__label">City</label>

          <CustomSearchDropdown
            options={cityOptions}
            selectedOption={selectedCityOption}
            onSelect={(option) =>
              setLocationId(Number(option.value))
            }
            placeholder="Choose a city"
          />
        </div>

        {/* DESCRIPTION */}
        <div className="create-request__field">
          <label className="create-request__label">Description</label>
          <textarea
            className="create-request__textarea"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Provide details about your offer..."
            onInput={(e) => {
              const el = e.currentTarget;
              el.style.height = 'auto';
              el.style.height = `${el.scrollHeight}px`;
            }}
          />
          <span className="create-request__hint">
            {description.length} / 1000 characters (min 50)
          </span>
        </div>

        {/* ACTIONS */}
        <div className="create-request__actions">
          <button
            type="button"
            className="create-request__cancel"
            onClick={() => navigate('/profile/offers')}
          >
            Cancel
          </button>

          <button
            type="submit"
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
