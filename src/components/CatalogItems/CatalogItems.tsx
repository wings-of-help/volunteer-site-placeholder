import CartItem from "../CartItem/CartItem";
import "./CatalogItems.scss";
import arrowDown from "../../assets/arrow-down.svg";
import { GetHelpCarts } from "../../api/helpCarts.api";
import type { HelpCart } from "../../api/types/HelpCart";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import type { ActiveFilter } from "../../pages/CatalogPage/CatalogPage";
import Loader from "../UI-elements/Loader/Loader";

type Props = {
  type: "offers" | "requests";
  kind: "offer" | "request";
  activeFilters: ActiveFilter[];
  sortType: string;
};

export default function CatalogItems({
  type,
  activeFilters,
  sortType,
  kind
}: Props) {
  const { t } = useTranslation();
  const [carts, setCarts] = useState<HelpCart[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);
    
  useEffect(() => {
    setIsLoading(true);
    setIsError(false);

    const locationFilter = activeFilters.find(
      (f) => f.type === "location"
    )?.id;

    const categoryFilters = activeFilters
      .filter(f => f.type === "category")
      .map(f => Number(f.id));

    const statusFilters = activeFilters
      .filter(f => f.type === "status")
      .map(f => f.id);

    const ordering =
      sortType === "newest" ? "-created_at" : "created_at";

    GetHelpCarts({
      kind,
      location: Number(locationFilter),
      status: statusFilters,
      category: categoryFilters,
      ordering,
    })
      .then((data) => {
        setCarts(data.results);
      })
      .catch((err) => {
        console.log(err);
        setIsError(true);
      })
      .finally(() => {
        setTimeout(() => {
          setIsLoading(false);
        }, 1000)
      });
  }, [kind, activeFilters, sortType]);

  return (
    <div className="catalog__container">
      <div className="catalog__items">
      {isLoading && <Loader />}

        {!isLoading && carts.map((cart) => (
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

      {!isLoading && carts.length === 0 && (
        <div className="no-results">
          <h3 className="no-results__title">{t("No-results")}</h3>
          <p className="no-results__p">
            {t("Try-changing-a-city-or-category")}
          </p>
        </div>
      )}

      {isError && (
        <div className="no-results">
          <h3 className="no-results__title">{t("Something-went-wrong")}</h3>
        </div>
      )}

      {!isLoading && carts.length >= 8 && (
        <div className="catalog__load-more-button">
          {t("Load-more")}
          <img className="arrow" src={arrowDown} alt="dropdown" />
        </div>
      )}
    </div>
  );
}