import { useEffect, useMemo } from 'react';
import PropTypes from 'prop-types';
import useFetch from '../hooks/useFetch';
import PlanetsContext from './PlanetsContext';

export default function PlanetsProvider({ children }) {
  const [fetchPlanets, planetsData, isFetchPlanetsLoading, errorMessage] = useFetch([]);
  useEffect(() => {
    fetchPlanets('https://swapi.dev/api/planets');
  }, [fetchPlanets]);
  const values = useMemo(() => ({
    planetsData,
    isFetchPlanetsLoading,
    errorMessage,
  }), [planetsData, isFetchPlanetsLoading, errorMessage]);
  return (
    <PlanetsContext.Provider value={ values }>
      { children }
    </PlanetsContext.Provider>
  );
}

PlanetsProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
