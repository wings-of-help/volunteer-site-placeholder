import "./CatalogPage.scss"
// import arrowDown from '../../assets/arrow-down.svg';
import CatalogCategories from "../../components/CatalogCategories/CatalogCategories";
import CatalogItems from "../../components/CatalogItems/CatalogItems";
import CustomSelect from "../../components/UI-elements/CustomSelect/CustomSelect";
import { useTranslation } from "react-i18next";
import Filters from "../../components/Filters/Filters";
import { useState } from "react";

type Props = {
  title: string;
  p: string;
  p2: string;
  path: 'offers' | 'requests';
}

export type FilterType = 'category' | 'location' | 'status';
// export type SortType = 'newest' | 'oldest';

export interface ActiveFilter {
  id: string;
  type: FilterType;
  value: string;
}

export default function CatalogPage ({title, p, p2, path}: Props) {
  const {t} = useTranslation();
  const [activeFilters, setActiveFilters] = useState<ActiveFilter[]>([])
  const [sortType, setSortType] = useState<string>('newest');

  const toggleFilter = (filter: ActiveFilter) => {
    setActiveFilters(prev => {
      const exists = prev.some(
        f => f.type === filter.type && f.value === filter.value
      );

      if (exists) {
        return prev.filter(
          f => !(f.type === filter.type && f.value === filter.value)
        );
      }

      return [...prev, filter];
    });
  };

  const setSingleFilter = (filter: ActiveFilter) => {
    setActiveFilters(prev => {
      const filtered = prev.filter(f => f.type !== filter.type);
      return [...filtered, filter];
    });
  };

  return (
    <div className="catalog__page">
      <div className="catalog">

        <div className="catalog__desc">
          <h1 className="catalog__desc__title">{title}</h1>

          <div className="catalog__desc__paragraphs">
            <p className="catalog__desc__paragraphs__p">{p}</p>
            <p className="catalog__desc__paragraphs__p">{p2}</p>
          </div>
        </div>

        <div className="catalog__sort">
          <p className="catalog__sort__sort-by">{t("Sort-by")}</p>

          <CustomSelect options={[
            { label: "Newest", value: "newest" },
            { label: "Oldest", value: "oldest" }
          ]}
          placeholder={"Newest"}
          variant="filter"
          setSortType={setSortType}
          />
        </div>

        <div className="catalog__main">
          <CatalogCategories
            activeFilters={activeFilters}
            onToggleFilter={toggleFilter}
            setSingleFilter={setSingleFilter}
          />

          <div className="catalog-items-box">
            {activeFilters.length > 0 && (
              <Filters
                filters={activeFilters}
                onRemove={(id: string) =>
                  setActiveFilters(prev => prev.filter(f => f.id !== id))
                }
                onClear={() => setActiveFilters([])}
              />
            )}
          
            <CatalogItems type={path} activeFilters={activeFilters} sortType={sortType}/>
          </div>
        </div>
      </div>
    </div>
  )
}
