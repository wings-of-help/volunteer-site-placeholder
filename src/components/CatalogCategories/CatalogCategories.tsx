import "./CatalogCategories.scss"
// import arrowDown from '../../assets/arrow-down.svg';
import CustomCheckbox from "../UI-elements/CurtomCheckbox/CustomCheckbox";
import { useAuth } from '../../context/AuthContext';
import CustomSearchDropdown from "../UI-elements/CustomSearchDropdown/CustomSearchDropdown";
// import { useState } from "react";
import citiesFromServer from "../../api/Locations.json"
import { useTranslation } from "react-i18next";
import type { ActiveFilter } from "../../pages/CatalogPage/CatalogPage";

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
  const {t} = useTranslation();

  const cityOptions = citiesFromServer.map(city => ({
    label: city,
    value: city.toLowerCase().replace(/\s+/g, "-"),
  }));

  const categories = [
    t("Evacuation/Relocation"),
    t("Medical-Support"),
    t("Shelter/Housing"),
    t("Food-&-Basic-Supplies"),
    t("Logistics/Transportation"),
    t("Psychological-Support"),
    t("Child-&-Family-Support"),
    t("Legal/Administrative Assistance"),
    t("Employment/Livelihoods"),
    t("Education/Tutoring"),
    t("Volunteer-Coordination/Community-Support"),
    t("Animal/Pet-Assistance"),
    t("Other")
  ]

  const statuses = ["new", "in progress", "done"]

  const selectedCityOption: Option | null = (() => {
    const filter = activeFilters.find(f => f.type === 'location');
    if (!filter) return null;

    return {
      label: filter.value,
      value: filter.id,
    };
  })();

  return (
    <div className="catalog__categories">

      <div className="catalog__categories__header">
        <h1 className="catalog__categories__header__title">{t("Help-category")}</h1>
        <p className="catalog__categories__header__p">{t("choose-category")}</p>
      </div>

      <div className="catalog__categories__box">
        {categories.map(category => (
           <CustomCheckbox
            key={category}
            title={category}
            activeFilters={activeFilters}
            onToggleFilter={onToggleFilter}
            checktype="category"
          />
        ))}
      </div>

      <div className="catalog__categories__location">
        <h1 className="catalog__categories__location__title">{t("Location")}</h1>
          <CustomSearchDropdown
            options={cityOptions}
            selectedOption={selectedCityOption}
            onSelect={(option) =>
              setSingleFilter({
                id: option.value,
                type: 'location',
                value: option.label,
              })
            }
          />
      </div>

      {isAuth && 
        <div className="catalog__categories__status">
          <h1 className="catalog__categories__status__title">{t("Status")}</h1>
            {statuses.map(status => (
              <CustomCheckbox
                key={status}
                title={status}
                activeFilters={activeFilters}
                onToggleFilter={onToggleFilter}
                checktype="status"
              />
            ))}
        </div>
      }
    </div>
  )
}
