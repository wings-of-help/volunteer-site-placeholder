import { useEffect, useRef, useState } from "react";
import "./CustomSearchDropdown.scss";
import arrow from "../../../assets/arrow-down-gray.svg"
import { useTranslation } from "react-i18next";
// import { useTranslation } from "react-i18next";

type Option = {
  label: string;
  value: string | number;
};

type Props = {
  options: Option[];
  selectedOption: Option | null;
  onSelect: (option: Option) => void;
  placeholder?: string;
};

export function CustomSearchDropdown({
  options,
  selectedOption,
  onSelect,
  placeholder,
}: Props) {
  const { t } = useTranslation();

  const [isOpen, setIsOpen] = useState(false);
  const [search, setSearch] = useState('');
  const [highlightedIndex, setHighlightedIndex] = useState(0);

  const inputRef = useRef<HTMLInputElement>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const optionsRef = useRef<HTMLDivElement[]>([]);

  // Фильтрация
  const filteredOptions = options.filter((o) =>
    o.label.toLowerCase().includes(search.toLowerCase()),
  );

  // Фокус при открытии
  useEffect(() => {
    if (isOpen) {
      setHighlightedIndex(0);
      requestAnimationFrame(() => inputRef.current?.focus());
    }
  }, [isOpen]);

  // Закрытие по клику вне
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        wrapperRef.current &&
        !wrapperRef.current.contains(e.target as Node)
      ) {
        closeDropdown();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Скролл к активному пункту
  useEffect(() => {
    if (optionsRef.current[highlightedIndex]) {
      optionsRef.current[highlightedIndex].scrollIntoView({
        block: 'nearest',
      });
    }
  }, [highlightedIndex]);

  const closeDropdown = () => {
    setIsOpen(false);
    setSearch('');
  };

  const handleSelect = (option: Option) => {
    onSelect(option);
    closeDropdown();
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (!filteredOptions.length) return;

    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault();
        setHighlightedIndex((prev) =>
          prev < filteredOptions.length - 1 ? prev + 1 : 0,
        );
        break;

      case 'ArrowUp':
        e.preventDefault();
        setHighlightedIndex((prev) =>
          prev > 0 ? prev - 1 : filteredOptions.length - 1,
        );
        break;

      case 'Enter':
        e.preventDefault();
        handleSelect(filteredOptions[highlightedIndex]);
        break;

      case 'Escape':
        closeDropdown();
        break;
    }
  };

  return (
    <div className="custom-dropdown" ref={wrapperRef}>
      <div
        className={`
          custom-dropdown__trigger
          ${isOpen ? 'open' : ''}
          ${selectedOption ? 'filled' : ''}
        `}
        onClick={() => setIsOpen((prev) => !prev)}
      >
        {isOpen ? (
          <input
            ref={inputRef}
            className="custom-dropdown__search"
            placeholder={t('Search')}
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setHighlightedIndex(0);
            }}
            onClick={(e) => e.stopPropagation()}
            onKeyDown={handleKeyDown}
          />
        ) : (
          <span
            className={`custom-dropdown__value ${
              selectedOption ? 'custom-dropdown__value--selected' : ''
            }`}
          >
            {selectedOption?.label ||
              placeholder ||
              t('Choose-a-city')}
          </span>
        )}

        <img src={arrow} className="custom-dropdown__arrow" />
      </div>

      {isOpen && (
        <div className="custom-dropdown__options">
          {filteredOptions.length ? (
            filteredOptions.map((option, index) => (
              <div
                key={option.value}
                ref={(el) => {
                  if (el) optionsRef.current[index] = el;
                }}
                className={`custom-dropdown__option ${
                  index === highlightedIndex ? 'active' : ''
                }`}
                onMouseEnter={() => setHighlightedIndex(index)}
                onClick={() => handleSelect(option)}
              >
                {option.label}
              </div>
            ))
          ) : (
            <div className="custom-dropdown__option empty">
              {t('Nothing-found')}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
