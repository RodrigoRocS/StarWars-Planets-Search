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
  const [filteredPlanets, setFilteredPlanets] = useState('');

  const planetList = results?.filter((el) => el.name
    .toLowerCase().includes(planetName.toLowerCase()));

  const columnList = useMemo(() => ['population',
    'orbital_period', 'diameter', 'rotation_period', 'surface_water'], []);

  const handleFilter = useCallback((filColumn, filComparison, filCompValue) => {
    let newPlanets = [];
    if (filComparison === 'maior que') {
      newPlanets = planetList?.filter((e) => parseFloat(e[filColumn]) > filCompValue);
    } else if (filComparison === 'menor que') {
      newPlanets = planetList?.filter((e) => e[filColumn] <= filCompValue);
    } else if (filComparison === 'igual a') {
      newPlanets = planetList?.filter((e) => e[filColumn] === filCompValue);
    }
    return setFilteredPlanets(newPlanets);
  }, [planetList]);
  console.log(column);
  console.log(compValue);
  console.log(filteredPlanets);
  console.log(planetList);
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
      filteredPlanets,
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
      filteredPlanets,
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
