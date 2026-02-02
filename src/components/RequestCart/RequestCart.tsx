import { useTranslation } from 'react-i18next';
import "./RequestCart.scss"

export default function RequestCart() {
  const { t } = useTranslation();
  return (
    <div className="home-active-requests__carts__cart">
      <div className="home-active-requests__carts__cart__photo"></div>

      <div className="home-active-requests__carts__cart__title">
        {t("active-requests-1st-block-title")}
      </div>

      <div className="home-active-requests__carts__cart__p">
        {t("active-requests-1st-block-p")}
      </div>

      <div className="home-active-requests__carts__cart__bottom">
        <p className="home-active-requests__carts__cart__bottom__city">{t("Kharkiv-city")}</p>
        <p className="home-active-requests__carts__cart__bottom__category">{t("Logistics")}</p>
      </div>
    </div>
  )
}
