import "./FilterTarget.scss"
import { useTranslation } from "react-i18next"
import filterIcon from "../../../assets/Filters-icon.svg"
import { useEffect, useState } from "react";
import closeIcon from '../../../assets/Filters-close-icon.svg';
import CatalogCategories from "../../CatalogCategories/CatalogCategories";
import type { ActiveFilter } from "../../../pages/CatalogPage/CatalogPage";


type Props = {
  activeFilters: ActiveFilter[];
  onToggleFilter: (filter: ActiveFilter) => void;
  setSingleFilter: (filter: ActiveFilter) => void;
};

export default function FilterTarget({activeFilters, onToggleFilter, setSingleFilter}: Props) {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const { t } = useTranslation();
  
    useEffect(() => {
      const handleEsc = (e: KeyboardEvent) => {
        if (e.key === 'Escape') setIsMenuOpen(false);
      };
  
      window.addEventListener('keydown', handleEsc);
      return () => window.removeEventListener('keydown', handleEsc);
    }, []);
  
    useEffect(() => {
      document.body.style.overflow = isMenuOpen ? 'hidden' : 'auto';
  
      return () => {
        document.body.style.overflow = 'auto';
      };
    }, [isMenuOpen]);

  return (
    <>
      <div className="filter-target" onClick={() => setIsMenuOpen(true)}>
        <img src={filterIcon} alt="Filters-icon" />
        <p className="filter-target__title">{t("Filters")}</p>
      </div>

      {isMenuOpen && (
        <div className='filters-menu'>
          <div className="filters-menu__header">
            <h1 className="filters-menu__header__title">{t("Filters")}</h1>

            <button
              className='filters-menu__close'
              onClick={() => setIsMenuOpen(false)}
            >
              <img src={closeIcon} alt="close menu" />
            </button>
          </div>

          <CatalogCategories
            activeFilters={activeFilters}
            onToggleFilter={onToggleFilter}
            setSingleFilter={setSingleFilter}
          />
        </div>
      )}
    </>
  )
}
