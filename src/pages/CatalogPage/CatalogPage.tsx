import "./CatalogPage.scss"
// import arrowDown from '../../assets/arrow-down.svg';
import CatalogCategories from "../../components/CatalogCategories/CatalogCategories";
import CatalogItems from "../../components/CatalogItems/CatalogItems";
import CustomSelect from "../../components/UI-elements/CustomSelect/CustomSelect";
import { useTranslation } from "react-i18next";

type Props = {
  title: string;
  p: string;
  p2: string;
  path: 'offers' | 'requests';
}

export default function CatalogPage ({title, p, p2, path}: Props) {
  const {t} = useTranslation();

  const newestLabel = t("Newest");
  const oldestLabel = t("Oldest");
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
            { label: newestLabel, value: "newest" },
            { label: oldestLabel, value: "oldest" }
          ]}
          placeholder={t("Newest")}
          variant="filter"/>
        </div>

        <div className="catalog__main">
          <CatalogCategories/>
          <CatalogItems type={path}/>
        </div>
      </div>
    </div>
  )
}
