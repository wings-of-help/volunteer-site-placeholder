import CartItem from "../CartItem/CartItem";
import "./CatalogItems.scss";
import arrowDown from "../../assets/arrow-down.svg";
import { GetHelpCarts } from "../../api/helpCarts.api";
import type { HelpCart } from "../../api/types/HelpCart";
import { useEffect, useState, useMemo } from "react";
import { useTranslation } from "react-i18next";
import type { ActiveFilter } from "../../pages/CatalogPage/CatalogPage";

type Props = {
  type: "offers" | "requests";
  activeFilters: ActiveFilter[];
  sortType: string;
};

export default function CatalogItems({
  type,
  activeFilters,
  sortType,
}: Props) {
  const { t } = useTranslation();
  const [carts, setCarts] = useState<HelpCart[]>([]);

  useEffect(() => {
    GetHelpCarts().then((data) => {
      setCarts(data.results);
    });
  }, []);

  const cartType: "offer" | "request" =
    type === "offers" ? "offer" : "request";

  const filteredCarts = useMemo(() => {
    const locationFilter = activeFilters.find(
      (f) => f.type === "location"
    )?.value;

    const statusFilter = activeFilters.find(
      (f) => f.type === "status"
    )?.value;

    const categoryFilters = activeFilters
      .filter((f) => f.type === "category")
      .map((f) => f.value);

    return carts
      .filter((cart) => cart.kind === cartType)
      .filter((cart) => {
        if (
          categoryFilters.length &&
          !categoryFilters.includes(cart.category_name)
        ) {
          return false;
        }

        if (locationFilter && locationFilter !== cart.location_name) {
          return false;
        }

        if (statusFilter && statusFilter !== cart.status) {
          return false;
        }

        return true;
      })
      .sort((a, b) => {
        const dateA = new Date(a.created_at).getTime();
        const dateB = new Date(b.created_at).getTime();

        return sortType === "newest"
          ? dateB - dateA // новіші зверху
          : dateA - dateB; // старіші зверху
      });
  }, [carts, cartType, activeFilters, sortType]);

  return (
    <div className="catalog__container">
      <div className="catalog__items">
        {filteredCarts.map((cart) => (
          <CartItem
            key={cart.id}
            type={type}
            id={cart.id}
            title={cart.title}
            location={cart.location_name}
            description={cart.description}
            status={cart.status}
            category={cart.category_name}
            kind={cart.kind}
          />
        ))}
      </div>

      {filteredCarts.length === 0 && (
        <div className="no-results">
          <h3 className="no-results__title">No results</h3>
          <p className="no-results__p">
            Try changing a city or category.
          </p>
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