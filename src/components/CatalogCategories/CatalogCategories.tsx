import "./CatalogCategories.scss"
// import arrowDown from '../../assets/arrow-down.svg';
import CustomCheckbox from "../UI-elements/CurtomCheckbox/CustomCheckbox";
import { useAuth } from '../../context/AuthContext';
import CustomSearchDropdown from "../UI-elements/CustomSearchDropdown/CustomSearchDropdown";
// import { useState } from "react";
import citiesFromServer from "../../api/Locations.json"
import { useTranslation } from "react-i18next";

export default function CatalogCategories() {
  const { isAuth } = useAuth();
  const {t} = useTranslation();

  const cityOptions = citiesFromServer.map(city => ({
    label: city,
    value: city.toLowerCase().replace(/\s+/g, "-"),
  }));
  return (
    <div className="catalog__categories">

      <div className="catalog__categories__header">
        <h1 className="catalog__categories__header__title">{t("Help-category")}</h1>
        <p className="catalog__categories__header__p">{t("choose-category")}</p>
      </div>

      <div className="catalog__categories__box">
        <CustomCheckbox title={t("Evacuation/Relocation")}/>
        <CustomCheckbox title={t("Medical-Support")}/>
        <CustomCheckbox title={t("Shelter/Housing")}/>
        <CustomCheckbox title={t("Food-&-Basic-Supplies")}/>
        <CustomCheckbox title={t("Logistics/Transportation")}/>
        <CustomCheckbox title={t("Psychological-Support")}/>
        <CustomCheckbox title={t("Child-&-Family-Support")}/>
        <CustomCheckbox title={t("Legal/Administrative Assistance")}/>
        <CustomCheckbox title={t("Employment/Livelihoods")}/>
        <CustomCheckbox title={t("Education/Tutoring")}/>
        <CustomCheckbox title={t("Volunteer-Coordination/Community-Support")}/>
        <CustomCheckbox title={t("Animal/Pet-Assistance")}/>
        <CustomCheckbox title={t("Other")}/>
      </div>

      <div className="catalog__categories__location">
        <h1 className="catalog__categories__location__title">{t("Location")}</h1>
        {/* <CustomSelect
          options={[
            { label: "Kyiv", value: "kyiv" },
            { label: "Lviv", value: "lviv" },
            { label: "Odesa", value: "odesa" },
          ]}
          placeholder="Choose a city"
          onChange={(value) => console.log(value)}
          /> */}

          <CustomSearchDropdown 
            options={cityOptions}
            onSelect={(value) => console.log(value)}
          />
      </div>

      {isAuth && 
        <div className="catalog__categories__status">
          <h1 className="catalog__categories__status__title">{t("Status")}</h1>
          <CustomCheckbox title={t("New")}/>
          <CustomCheckbox title={t("In-progress")}/>
          <CustomCheckbox title={t("Done")}/>
        </div>
      }
    </div>
  )
}
