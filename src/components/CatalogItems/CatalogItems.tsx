import CartItem from "../CartItem/CartItem";
import "./CatalogItems.scss"
import arrowDown from '../../assets/arrow-down.svg';
import { mockHelpCarts } from "../../api/helpCarts.api";
import type { HelpCart } from "../../api/types/HelpCart";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import type { ActiveFilter } from "../../pages/CatalogPage/CatalogPage";

type Props = {
  type: 'offers' | 'requests';
  activeFilters: ActiveFilter[];
}
export default function CatalogItems({ type, activeFilters }: Props) {
  const { t } = useTranslation();
  const [carts] = useState<HelpCart[]>(mockHelpCarts);

  const filteredCarts = carts.filter(cart => {
    const categoryFilters = activeFilters.filter(f => f.type === 'category');
    if (
      categoryFilters.length &&
      !categoryFilters.some(f => f.value === cart.category_name)
    ) {
      return false;
    }

    const locationFilter = activeFilters.find(f => f.type === 'location');
    if (locationFilter && locationFilter.value !== cart.location_name) {
      return false;
    }

    const statusFilter = activeFilters.find(f => f.type === 'status');
    if (statusFilter && statusFilter.value !== cart.status) {
      return false;
    }

    return true;
  });

  return (
    <div className="catalog__container">
      <div className="catalog__items">
        {filteredCarts.map(cart => (
          <CartItem
            type={type}
            key={cart.id}
            id={cart.id}
            title={cart.title}
            location={cart.location_name}
            description={cart.description}
            status={cart.status}
            category={cart.category_name}
          />
        ))}
      </div>

      {filteredCarts.length === 0 && (
        <div className="no-results">
          <h3 className="no-results__title">No results</h3>
          <p className="no-results__p">Try changing a city or category.</p>
        </div>
      )}
      {filteredCarts.length > 7 && (
        <div className="catalog__load-more-button">
          {t("Load-more")}
          <img className="arrow" src={arrowDown} alt="dropdown" />
        </div>
      )}
    </div>
  );
}