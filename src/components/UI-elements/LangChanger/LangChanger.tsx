import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import CustomSelect from "../CustomSelect/CustomSelect";
import "./LangChanger.scss";

type LangOption = {
  label: string;
  value: string;
};

const LANG_OPTIONS: LangOption[] = [
  { label: "EN", value: "en" },
  { label: "UK", value: "uk" },
];

export const LangChanger = () => {
  const { i18n } = useTranslation();
  const [currentLang, setCurrentLang] = useState<string>("EN");

  useEffect(() => {
    const found = LANG_OPTIONS.find(
      (lang) => lang.value === i18n.language
    );

    if (found) {
      setCurrentLang(found.label);
    }
  }, [i18n.language]);

  const handleChangeLang = (value: string) => {
    i18n.changeLanguage(value);
  };

  return (
    <div className="lang-changer">
      <CustomSelect
        options={LANG_OPTIONS}
        placeholder={currentLang}
        onChange={handleChangeLang}
        variant="lang"
      />
    </div>
  );
};
