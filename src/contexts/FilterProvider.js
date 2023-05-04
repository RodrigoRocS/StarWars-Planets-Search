import PropTypes from 'prop-types';
import { useMemo, useState } from 'react';
import FilterContext from './FilterContext';

export default function FilterProvider({ children }) {
  const [planetName, setPlanetName] = useState('');
  const [column, setColumn] = useState('population');
  const [comparison, setComparison] = useState('maior que');
  const [compValue, setCompValue] = useState(0);
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
