import PropTypes from 'prop-types';
import { useMemo, useState, useContext, useCallback } from 'react';
import FilterContext from './FilterContext';
import PlanetsContext from './PlanetsContext';

export default function FilterProvider({ children }) {
  const { planetsData: { results } } = useContext(PlanetsContext);

  const [column, setColumn] = useState('population');
  const [columnSelect, setColumnSelect] = useState('');
  const [comparison, setComparison] = useState('maior que');
  const [compValue, setCompValue] = useState(0);
  const [planetName, setPlanetName] = useState('');
  const [filters, setFilters] = useState({});

  const planetList = results?.filter((e) => e.name
    .toLowerCase().includes(planetName.toLowerCase())).filter((el) => {
    switch (filters.filComparison) {
    case 'maior que':
      return parseFloat(el[filters.filColumn]) > filters.filCompValue;
    case 'menor que':
      return el[filters.filColumn] <= filters.filCompValue;
    case 'igual a':
      return el[filters.filColumn] === filters.filCompValue;
    default:
      return el;
    }
  });

  const columnList = useMemo(() => ['population',
    'orbital_period', 'diameter', 'rotation_period', 'surface_water'], []);

  const handleFilter = useCallback((
    filColumn,
    filComparison,
    filCompValue,
  ) => setFilters({ filColumn,
    filComparison,
    filCompValue }), []);

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
      columnSelect,
      setColumnSelect,
      filters,
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
      columnSelect,
      setColumnSelect,
      filters,
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
