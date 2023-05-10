import React from 'react';
import './App.css';
import Table from './components/Table';
import FilterProvider from './contexts/FilterProvider';

function App() {
  return (
    <>
      <FilterProvider>
        {/* <span className="page-title">Projeto Star Wars - Trybe</span> */}
        <Table />
      </FilterProvider>
      ,
    </>
  );
}

export default App;
