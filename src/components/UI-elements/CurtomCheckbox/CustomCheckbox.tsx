import "./CustomCheckbox.scss"
import checkIcon from "../../../assets/Chechbox.svg"
import type { ActiveFilter } from "../../../pages/CatalogPage/CatalogPage"
import { formatLabel } from "../../../utils/FormatLabel";

type Props = {
  id: string;
  title: string;
  activeFilters: ActiveFilter[];
  onToggleFilter: (filter: ActiveFilter) => void;
  checktype: "category" | "status";
}

export default function CustomCheckbox({ title, activeFilters, onToggleFilter, checktype, id }: Props) {
  const isChecked = activeFilters.some(
    f => f.type === checktype && f.id === id
  );

  return (
    <label className="custom__checkbox">
      <input
        type="checkbox"
        checked={isChecked}
        onChange={() =>
          onToggleFilter({
            type: checktype,
            value: title,
            id: id,
          })
        }
        hidden
      />

      <span
        className={`custom__checkbox-box ${
          isChecked ? "custom__checkbox-box--checked" : ""
        }`}
      >
        {isChecked && <img src={checkIcon} alt="checked" />}
      </span>

      <span className="custom__checkbox-text">{formatLabel(title)}</span>
    </label>
  )
}