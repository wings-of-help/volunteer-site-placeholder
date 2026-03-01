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
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [page, setPage] = useState(1);
  const [nextUrl, setNextUrl] = useState<string | null>(null);

  const buildParams = () => {
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

    return {
      kind,
      location: Number(locationFilter),
      status: statusFilters,
      category: categoryFilters,
      ordering,
      page,
    };
  };

  const fetchCarts = async (isLoadMore = false) => {
    try {
      setIsLoading(true);
      setIsError(false);

      const data = await GetHelpCarts(buildParams());

      if (isLoadMore) {
        setCarts(prev => [...prev, ...data.results]);
      } else {
        setCarts(data.results);
      }

      setNextUrl(data.next);
    } catch (err) {
      console.log(err);
      setIsError(true);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    setPage(1);
    setCarts([]);
  }, [kind, activeFilters, sortType]);

  useEffect(() => {
    fetchCarts(page > 1);
  }, [page]);

  return (
    <div className="catalog__container">
      <div className="catalog__items">
        {carts.map((cart) => (
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

        {isLoading && <Loader />}
      </div>

      {!isLoading && carts.length === 0 && !isError && (
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

      {nextUrl && !isLoading && (
        <div
          className="catalog__load-more-button"
          onClick={() => setPage(prev => prev + 1)}
        >
          {t("Load-more")}
          <img className="arrow" src={arrowDown} alt="dropdown" />
        </div>
      )}
    </div>
  );
}