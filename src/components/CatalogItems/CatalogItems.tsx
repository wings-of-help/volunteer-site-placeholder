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
  const [isInitialLoading, setIsInitialLoading] = useState(true);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const [isError, setIsError] = useState(false);
  const [page, setPage] = useState(1);
  const [nextUrl, setNextUrl] = useState<string | null>(null);

  const buildParams = (pageNumber: number) => {
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
      location: locationFilter ? Number(locationFilter) : undefined,
      status: statusFilters,
      category: categoryFilters,
      ordering,
      page: pageNumber,
    };
  };

  const fetchCarts = (pageNumber: number, isLoadMore = false) => {

  if (isLoadMore) {
    setIsLoadingMore(true);
  } else {
    setIsInitialLoading(true);
  }

  setIsError(false);

  GetHelpCarts(buildParams(pageNumber))
    .then((data) => {

      if (isLoadMore) {
        // 🔥 затримуємо ДОДАВАННЯ карток
        setTimeout(() => {
          setCarts(prev => [...prev, ...data.results]);
          setIsLoadingMore(false);
        }, 1000);

      } else {
        setTimeout(() => {
          setCarts(data.results);
          setIsInitialLoading(false);
        }, 1000);
      }

      setNextUrl(data.next);
    })
    .catch((err) => {
      console.log(err);
      setIsError(true);
      setIsLoadingMore(false);
      setIsInitialLoading(false);
    });
};

  useEffect(() => {
    setPage(1);
    fetchCarts(1, false);
  }, [kind, activeFilters, sortType]);

  const handleLoadMore = () => {
    // setTimeout(() => {
      const nextPage = page + 1;
      setPage(nextPage);
      fetchCarts(nextPage, true);
    // }, 1000)
  };

  return (
    <div className="catalog__container">
      <div className="catalog__items">

        {isInitialLoading ? (
          <Loader />
        ) : (
          <>
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
          </>
        )}

      </div>

      {!isInitialLoading && carts.length === 0 && !isError && (
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

      {isLoadingMore && (
        <div className="catalog__loading-more">
          <Loader />
        </div>
      )}

      {nextUrl && !isLoadingMore && !isInitialLoading && (
        <div
          className="catalog__load-more-button"
          onClick={handleLoadMore}
        >
          {t("Load-more")}
          <img className="arrow" src={arrowDown} alt="dropdown" />
        </div>
      )}
    </div>
  );
}