import PropTypes from 'prop-types';
import { useMemo, useState, useContext, useCallback } from 'react';
import FilterContext from './FilterContext';
import PlanetsContext from './PlanetsContext';

export default function FilterProvider({ children }) {
  const { planetsData: { results } } = useContext(PlanetsContext);

  const [column, setColumn] = useState('population');
  const [comparison, setComparison] = useState('maior que');
  const [compValue, setCompValue] = useState(0);
  const [planetName, setPlanetName] = useState('');
  const [filters, setFilters] = useState([]);
  const [columnList, setColumnList] = useState(['population',
    'orbital_period', 'diameter', 'rotation_period', 'surface_water']);

  const planetList = results?.filter((e) => e.name
    .toLowerCase().includes(planetName.toLowerCase())).filter((el) => {
    let filtered = true;
    filters.forEach((filter) => {
      console.log(filter);
      console.log(el);
      switch (filter.filComparison) {
      case 'maior que':
        filtered = filtered && Number(el[filter.filColumn]) > +filter.filCompValue;
        break;
      case 'menor que':
        filtered = filtered && Number(el[filter.filColumn]) < +filter.filCompValue;
        break;
      case 'igual a':
        filtered = filtered && Number(el[filter.filColumn]) === +filter.filCompValue;
        break;
      default:
        break;
      }
    });
    return filtered;
  });

  const handleFilter = useCallback((
    filColumn,
    filComparison,
    filCompValue,
  ) => {
    const newFilter = { filColumn,
      filComparison,
      filCompValue };
    setFilters([...filters, newFilter]);
  }, [filters]);

  const values = useMemo(
    () => ({
      planetName,
      setPlanetName,
      column,
      setColumn,
      comparison,
      setComparison,
      compValue,
      setCompValue,
      planetList,
      columnList,
      handleFilter,
      filters,
      setColumnList,
    }),
    [
      planetName,
      setPlanetName,
      column,
      setColumn,
      comparison,
      setComparison,
      compValue,
      setCompValue,
      planetList,
      columnList,
      handleFilter,
      filters,
      setColumnList,
    ],
  );

  return (
    <FilterContext.Provider value={ values }>
      { children }
    </FilterContext.Provider>
  );
}

FilterProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
