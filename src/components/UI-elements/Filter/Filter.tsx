import "./Filter.scss"
import cancel from "../../../assets/X.png"

type Props = {
  filter: string;
  onRemove: () => void;
}

export default function Filter({filter, onRemove}: Props) {
  return (
    <div className="filter">
      <p className="filter-criteria">{filter}</p>
      <img src={cancel} alt="cancel" className="cancel" onClick={onRemove}/>
    </div>
  )
}
