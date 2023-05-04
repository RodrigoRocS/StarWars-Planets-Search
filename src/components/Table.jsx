import React, { useContext } from 'react';
import PlanetsContext from '../contexts/PlanetsContext';
import FilterContext from '../contexts/FilterContext';
// import './Table.css';
import Filters from './Filters';

function Table() {
  const { isFetchPlanetsLoading } = useContext(PlanetsContext);
  const { planetName, setPlanetName, planetList } = useContext(FilterContext);
  return (
    <div>
      <section>
        <input
          type="text"
          value={ planetName }
          data-testid="name-filter"
          onChange={ ({ target }) => setPlanetName(target.value) }
          placeholder="Buscar"
        />
      </section>
      <Filters />
      {
        isFetchPlanetsLoading
          ? <p>Carregando...</p>
          : (
            <table>
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Rotation Period</th>
                  <th>Orbital Period</th>
                  <th>Diameter</th>
                  <th>Climate</th>
                  <th>Gravity</th>
                  <th>Terrain</th>
                  <th>Surface Water</th>
                  <th>Population</th>
                  <th>Films</th>
                  <th>Created</th>
                  <th>Edited</th>
                  <th>URL</th>
                </tr>
              </thead>
              <tbody>
                { planetList?.map((e) => (
                  <tr key={ e.name }>
                    <td>{ e.name }</td>
                    <td>{ e.rotation_period }</td>
                    <td>{ e.orbital_period }</td>
                    <td>{ e.diameter }</td>
                    <td>{ e.climate }</td>
                    <td>{ e.gravity }</td>
                    <td>{ e.terrain }</td>
                    <td>{ e.surface_water }</td>
                    <td>{ e.population }</td>
                    <td>{ e.films }</td>
                    <td>{ e.created }</td>
                    <td>{ e.edited }</td>
                    <td>{ e.url }</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )
      }

    </div>
  );
}

export default Table;
