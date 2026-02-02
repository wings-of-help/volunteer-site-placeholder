import "./CatalogCategories.scss"
// import arrowDown from '../../assets/arrow-down.svg';
import CustomCheckbox from "../UI-elements/CurtomCheckbox/CustomCheckbox";
import { useAuth } from '../../context/AuthContext';
import CustomSearchDropdown from "../UI-elements/CustomSearchDropdown/CustomSearchDropdown";
import { useState } from "react";
import citiesFromServer from "../../api/Locations.json"

export default function CatalogCategories() {
  const { isAuth } = useAuth();

  const cityOptions = citiesFromServer.map(city => ({
    label: city,
    value: city.toLowerCase().replace(/\s+/g, "-"),
  }));
  return (
    <div className="catalog__categories">

      <div className="catalog__categories__header">
        <h1 className="catalog__categories__header__title">Help Category</h1>
        <p className="catalog__categories__header__p">Choose one or more categories</p>
      </div>

      <div className="catalog__categories__box">
        <CustomCheckbox title={"Evacuation / Relocation"}/>
        <CustomCheckbox title={"Medical Support"}/>
        <CustomCheckbox title={"Shelter / Housing"}/>
        <CustomCheckbox title={"Food & Basic Supplies"}/>
        <CustomCheckbox title={"Logistics / Transportation"}/>
        <CustomCheckbox title={"Psychological Support"}/>
        <CustomCheckbox title={"Child & Family Support"}/>
        <CustomCheckbox title={"Legal / Administrative Assistance"}/>
        <CustomCheckbox title={"Employment / Livelihoods"}/>
        <CustomCheckbox title={"Education / Tutoring"}/>
        <CustomCheckbox title={"Volunteer Coordination / Community Support"}/>
        <CustomCheckbox title={"Animal / Pet Assistance"}/>
        <CustomCheckbox title={"Other"}/>
      </div>

      <div className="catalog__categories__location">
        <h1 className="catalog__categories__location__title">Location</h1>
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
          <h1 className="catalog__categories__status__title">Status</h1>
          <CustomCheckbox title="New"/>
          <CustomCheckbox title="In progress"/>
          <CustomCheckbox title="Done"/>
        </div>
      }
    </div>
  )
}
