import React, { useContext } from 'react';
import FilterContext from '../contexts/FilterContext';
// import './Filters.css';

function Filters() {
  const
    {
      column,
      setColumn,
      comparison,
      setComparison,
      compValue,
      setCompValue,
      columnList,
      planetName,
      setPlanetName,
      handleCleanAllFilters,
      handleAddFilter,
      sortColumn,
      setSortColumn,
      sortOrder,
      setSortOrder,
      setSortListBy,
    } = useContext(FilterContext);

  const handleOrderClick = () => {
    const takeColumn = sortColumn;
    const takeSort = sortOrder;
    setSortListBy({ order: { column: takeColumn, sort: takeSort } });
  };

  return (
    <div className="filters-container">
      <section>
        <input
          type="text"
          value={ planetName }
          data-testid="name-filter"
          onChange={ ({ target }) => setPlanetName(target.value) }
          placeholder="Buscar"
        />
      </section>
      <label htmlFor="column-filter">Coluna:</label>
      <select
        id="column-filter"
        value={ column }
        onChange={ ({ target }) => setColumn(target.value) }
        data-testid="column-filter"
      >
        { columnList.map((e) => <option value={ e } key={ e }>{e}</option>) }
      </select>
      <label htmlFor="comparison-filter">Operador:</label>
      <select
        id="comparison-filter"
        value={ comparison }
        onChange={ ({ target }) => setComparison(target.value) }
        data-testid="comparison-filter"
      >
        <option value="maior que">maior que</option>
        <option value="menor que">menor que</option>
        <option value="igual a">igual a</option>
      </select>
      <input
        type="number"
        data-testid="value-filter"
        value={ compValue }
        onChange={ ({ target }) => setCompValue(target.value) }
      />
      <button
        data-testid="button-filter"
        onClick={ handleAddFilter }
      >
        FILTRAR

      </button>
      <button
        data-testid="button-remove-filters"
        onClick={ handleCleanAllFilters }
      >
        REMOVER FILTROS

      </button>
      <div>
        <label htmlFor="column-sort">Ordenar:</label>
        <select
          id="column-sort"
          data-testid="column-sort"
          onChange={ ({ target }) => setSortColumn(target.value) }
          value={ sortColumn }
        >
          <option value="population">population</option>
          <option value="orbital_period">orbital_period</option>
          <option value="diameter">diameter</option>
          <option value="rotation_period">rotation_period</option>
          <option value="surface_water">surface_water</option>
        </select>

        <label>
          <input
            type="radio"
            name="order"
            value="ASC"
            checked={ sortOrder === 'ASC' }
            onChange={ () => setSortOrder('ASC') }
            data-testid="column-sort-input-asc"
          />
          Ascendente
        </label>
        <label>
          <input
            type="radio"
            name="order"
            value="DSC"
            checked={ sortOrder === 'DESC' }
            onChange={ () => setSortOrder('DESC') }
            data-testid="column-sort-input-desc"
          />
          Descendente
        </label>
        <button
          data-testid="column-sort-button"
          onClick={ handleOrderClick }
        >
          ORDENAR

        </button>
      </div>
    </div>
  );
}

export default Filters;
