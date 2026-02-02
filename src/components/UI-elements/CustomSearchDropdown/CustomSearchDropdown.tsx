import { useEffect, useRef, useState } from "react";
import "./CustomSearchDropdown.scss";
import arrow from "../../../assets/arrow-down-gray.svg"

type Option = {
  label: string;
  value: string;
};

type Props = {
  options: Option[];
  onSelect: (option: Option) => void;
};

export default function CustomSearchDropdown({ options, onSelect }: Props) {
  const [isOpen, setIsOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [selected, setSelected] = useState<Option | null>(null);

  const inputRef = useRef<HTMLInputElement>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);

  const filteredOptions = options.filter(o =>
    o.label.toLowerCase().includes(search.toLowerCase())
  );

  useEffect(() => {
    if (isOpen) {
      requestAnimationFrame(() => inputRef.current?.focus());
    }
  }, [isOpen]);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (wrapperRef.current && !wrapperRef.current.contains(e.target as Node)) {
        setIsOpen(false);
        setSearch("");
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSelect = (option: Option) => {
    setSelected(option);
    setIsOpen(false);
    setSearch("");
    onSelect(option);
  };

  return (
    <div className="custom-dropdown" ref={wrapperRef}>
      <div
        className={`custom-dropdown__trigger ${isOpen ? "open" : ""}`}
        onClick={() => setIsOpen(prev => !prev)}
      >
        {isOpen ? (
          <input
            ref={inputRef}
            className="custom-dropdown__search"
            placeholder="Search..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            onClick={e => e.stopPropagation()} 
          />
        ) : (
          <span
            className={`custom-dropdown__value ${
              selected ? "custom-dropdown__value--selected" : ""
            }`}
          >
            {selected?.label || "Choose a city"}
          </span>
        )}

        <img src={arrow} className="custom-dropdown__arrow" />
      </div>

      {isOpen && (
        <div className="custom-dropdown__options">
          {filteredOptions.length ? (
            filteredOptions.map(option => (
              <div
                key={option.value}
                className="custom-dropdown__option"
                onClick={() => handleSelect(option)}
              >
                {option.label}
              </div>
            ))
          ) : (
            <div className="custom-dropdown__option empty">Nothing found</div>
          )}
        </div>
      )}
    </div>
  );
}
