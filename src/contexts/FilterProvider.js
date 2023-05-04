import PropTypes from 'prop-types';
import { useMemo, useState, useContext, useCallback } from 'react';
import FilterContext from './FilterContext';
import PlanetsContext from './PlanetsContext';

export default function FilterProvider({ children }) {
  const { planetsData: { results } } = useContext(PlanetsContext);

  const [column, setColumn] = useState('Todos');
  const [columnSelect, setColumnSelect] = useState('Todos');
  const [comparison, setComparison] = useState('maior que');
  const [compValue, setCompValue] = useState(0);
  const [planetName, setPlanetName] = useState('');

  const planetList = results?.filter((el) => el.name
    .toLowerCase().includes(planetName.toLowerCase()));

  const columnList = useMemo(() => ['population',
    'orbital_period', 'diameter', 'rotation_period', 'surface_water'], []);

  const handleFilter = useCallback((filColumn, filComparison, filCompValue) => {
    let filteredPlanets = [];
    if (filComparison === 'maior que') {
      filteredPlanets = planetList?.filter((e) => e[filColumn] > filCompValue);
    } else if (filComparison === 'menor que') {
      filteredPlanets = planetList?.filter((e) => e[filColumn] < filCompValue);
    } else if (filComparison === 'igual a') {
      filteredPlanets = planetList?.filter((e) => e[filColumn] === filCompValue);
    }
    return filteredPlanets;
  }, [planetList]);

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
