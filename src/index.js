import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import PlanetsProvider from './contexts/PlanetsProvider';
import FilterProvider from './contexts/FilterProvider';

ReactDOM
  .createRoot(document.getElementById('root'))
  .render(
    <FilterProvider>
      <PlanetsProvider>
        <App />
      </PlanetsProvider>
    </FilterProvider>,
  );
