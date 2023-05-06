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
  const [sortColumn, setSortColumn] = useState('population');
  const [sortOrder, setSortOrder] = useState('');
  const [sortListBy,
    setSortListBy] = useState({ order: { column: sortColumn, sort: sortOrder } });
  console.log(sortListBy);

  const planetList = results?.filter((e) => e.name
    .toLowerCase().includes(planetName.toLowerCase())).filter((el) => {
    let filtered = true;
    filters.forEach((filter) => {
      switch (filter.filComparison) {
      case 'maior que':
        filtered = filtered && +el[filter.filColumn] > +filter.filCompValue;
        break;
      case 'menor que':
        filtered = filtered && +el[filter.filColumn] < +filter.filCompValue;
        break;
      case 'igual a':
        filtered = filtered && +el[filter.filColumn] === +filter.filCompValue;
        break;
      default:
        break;
      }
    });
    return filtered;
  });

  const handleSortList = useCallback((list) => {
    if (!sortListBy.order.sort) {
      return list;
    }
    const unknowns = list.filter((e) => e[sortListBy.order.column] === 'unknown');
    const filteredList = list.filter((e) => e[sortListBy.order.column] !== 'unknown');
    filteredList.sort((a, b) => (sortListBy.order.sort === 'ASC'
      ? a[sortListBy.order.column] - b[sortListBy.order.column]
      : b[sortListBy.order.column] - a[sortListBy.order.column]));
    return [...filteredList, ...unknowns];
  }, [sortListBy.order.sort, sortListBy.order.column]);

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

  const handleCleanFilters = useCallback(({ target }) => {
    setColumnList([...columnList, target.id]);
    setFilters(filters.filter((e) => e.filColumn !== target.id));
  }, [columnList, filters]);

  const handleCleanAllFilters = useCallback(() => {
    const filteredColumns = filters.map((e) => e.filColumn);
    setColumnList([...columnList, ...filteredColumns]);
    setFilters([]);
  }, [columnList, filters]);

  const handleAddFilter = useCallback(() => {
    handleFilter(column, comparison, compValue);
    const filteredColumnList = columnList.filter((e) => !column.includes(e));
    setColumnList(filteredColumnList);
    setColumn(filteredColumnList[0]);
  }, [column, columnList, comparison, handleFilter, compValue]);

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
      handleCleanFilters,
      handleCleanAllFilters,
      handleAddFilter,
      sortColumn,
      setSortColumn,
      sortOrder,
      setSortOrder,
      handleSortList,
      setSortListBy,
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
      handleCleanFilters,
      handleCleanAllFilters,
      handleAddFilter,
      sortColumn,
      setSortColumn,
      sortOrder,
      setSortOrder,
      handleSortList,
      setSortListBy,
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
