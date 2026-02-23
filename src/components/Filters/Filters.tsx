import type { ActiveFilter } from '../../pages/CatalogPage/CatalogPage';
import Filter from '../UI-elements/Filter/Filter'
import './Filters.scss'

type Props = {
  filters: ActiveFilter[];
  onRemove: (id: string) => void;
  onClear: () => void;
  // onToggleFilter: (f: ActiveFilter) => void;
}

export default function Filters({filters, onRemove, onClear}: Props) {
  return (
    <div className='filters-container'>
      {filters.map(filter => (
        <Filter
          key={filter.id}
          filter={filter.value}
          onRemove={() => onRemove(filter.id)}
          // onToggleFilter={onToggleFilter}
        />
      ))}

      <p onClick={onClear} className="clear">Clear Filters</p>
    </div>
  )
}
