import './CatalogCategories.scss';
// import arrowDown from '../../assets/arrow-down.svg';
import CustomCheckbox from '../UI-elements/CurtomCheckbox/CustomCheckbox';
import { useAuth } from '../../context/AuthContext';
import { CustomSearchDropdown } from '../UI-elements/CustomSearchDropdown/CustomSearchDropdown';
import { useEffect, useState } from 'react';
import { getCategories, getLocations, type Category } from '../../api/catalog.api';
import type { Location } from '../../api/types/catalog';

import { useTranslation } from 'react-i18next';
import type { ActiveFilter } from '../../pages/CatalogPage/CatalogPage';

type Option = {
  label: string;
  value: string;
};

type Props = {
  activeFilters: ActiveFilter[];
  onToggleFilter: (filter: ActiveFilter) => void;
  setSingleFilter: (filter: ActiveFilter) => void;
};

export default function CatalogCategories({
  onToggleFilter,
  setSingleFilter,
  activeFilters,
}: Props) {
  const { isAuth } = useAuth();
  const { t } = useTranslation();
  const [locations, setLocations] = useState<Location[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);

  const statuses = ['new', 'in_progress', 'done'];

  const cityOptions: Option[] = locations.map((city) => ({
    label: city.name,
    value: String(city.id),
  }));

  const selectedCityOption =
    cityOptions.find(
      (option) =>
        activeFilters.find(
          (f) => f.type === "location"
        )?.id === String(option.value)
    ) || null;

  useEffect(() => {
    const loadLocations = async () => {
      try {
        const data = await getLocations();
        setLocations(data);
      } catch (error) {
        console.error('Failed to load locations', error);
      }
    };

    const loadCategories = async () => {
      try {
        const data = await getCategories();
        const sortedCategories = [...data].sort((a, b) => a.id - b.id);
        setCategories(sortedCategories);
      } catch (error) {
        console.error('Failed to load categories', error);
      }
    };

    loadLocations();
    loadCategories();
  }, []);

  return (
    <div className='catalog__categories'>
      <div className='catalog__categories__header'>
        <h1 className='catalog__categories__header__title'>
          {t('Help-category')}
        </h1>
        <p className='catalog__categories__header__p'>{t('choose-category')}</p>
      </div>

      <div className='catalog__categories__box'>
        {categories.map((category) => (
          <CustomCheckbox
            key={category.id}
            id={String(category.id)}
            title={category.name}
            activeFilters={activeFilters}
            onToggleFilter={onToggleFilter}
            checktype="category"
          />
        ))}
      </div>

      <div className='catalog__categories__location'>
        <h1 className='catalog__categories__location__title'>
          {t('Location')}
        </h1>
        <CustomSearchDropdown
          options={cityOptions}
          selectedOption={selectedCityOption}
          onSelect={(option) =>
            setSingleFilter({
              id: String(option.value),
              type: 'location',
              value: option.label,
            })
          }
        />
      </div>

      {isAuth && (
        <div className='catalog__categories__status'>
          <h1 className='catalog__categories__status__title'>{t('Status')}</h1>
          {statuses.map((status) => (
            <CustomCheckbox
              id={status}
              key={status}
              title={status}
              activeFilters={activeFilters}
              onToggleFilter={onToggleFilter}
              checktype='status'
            />
          ))}
        </div>
      )}
    </div>
  );
}
