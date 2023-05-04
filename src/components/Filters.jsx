import React, { useContext } from 'react';
import FilterContext from '../contexts/FilterContext';
// import './Filters.css';

function Filters() {
  const
    {
      column,
      setColumn,
      columnSelect,
      setColumnSelect,
      comparison,
      setComparison,
      compValue,
      setCompValue,
      columnList,
      // handleFilter,
    } = useContext(FilterContext);

  const filteredColumnList = columnList.filter((e) => !columnSelect.includes(e));
  return (
    <div className="filters-container">
      <label htmlFor="column-filter">Coluna:</label>
      <select
        id="column-filter"
        value={ column }
        onChange={ ({ target }) => setColumn(target.value) }
        data-testid="column-filter"
      >
        <option>Todos</option>
        { filteredColumnList.map((e) => <option value={ e } key={ e }>{e}</option>) }
      </select>
      <label htmlFor="comparison-filter">Operador:</label>
      <select
        id="comparison-filter"
        value={ comparison }
        onChange={ ({ target }) => setComparison(target.value) }
        data-testid="comparison-filter"
      >
        <option value="maior que">Maior que:</option>
        <option value="menor que">Menor que:</option>
        <option value="igual a">Igual a:</option>
      </select>
      <input
        type="number"
        data-testid="value-filter"
        value={ compValue }
        onChange={ ({ target }) => setCompValue(target.value) }
      />
      <button
        data-testid="button-filter"
        onClick={ () => setColumnSelect((ps) => ([...ps, column])) }
      >
        FILTRAR

      </button>
    </div>
  );
}

export default Filters;
