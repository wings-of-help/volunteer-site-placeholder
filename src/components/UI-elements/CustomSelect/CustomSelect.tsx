import { useEffect, useRef, useState } from "react";
import "./CustomSelect.scss";
import arrowDown from '../../../assets/arrow-down-gray.svg';
// import type { SortType } from "../../../pages/CatalogPage/CatalogPage";

type Option = {
  label: string;
  value: string;
};

type Props = {
  options: Option[];
  placeholder?: string;
  onChange?: (value: string) => void;
  variant?: "default" | "lang" | "filter";
  setSortType?: (value: string) => void;
};

export default function CustomSelect({
  options,
  placeholder,
  onChange,
  variant = "default",
  setSortType = () => {},
}: Props) {
  const [isOpen, setIsOpen] = useState(false);
  const [selected, setSelected] = useState<Option | null>(null);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSelect = (option: Option) => {
    setSelected(option);
    setSortType(option.value);
    setIsOpen(false);
    onChange?.(option.value);
  };

  return (
    <div className={`custom-select custom-select--${variant}`} ref={ref}>
      <button
        type="button"
        className={`custom-select__trigger ${isOpen ? "open" : ""}`}
        onClick={() => setIsOpen((prev) => !prev)}
      >
        <span className="selected-ops">{selected?.label || placeholder}</span>
        <img src={arrowDown} className="arrow" alt="dropdown"/>
      </button>

      {isOpen && (
        <ul className="custom-select__options">
          {options.map((option) => (
            <li
              key={option.value}
              className="custom-select__option"
              onClick={() => handleSelect(option)}
            >
              {option.label}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
