import React from 'react';
import { render, screen, act, waitForElementToBeRemoved } from '@testing-library/react';
import App from '../App';
import testData from '../../cypress/mocks/testData';
import FilterProvider from '../contexts/FilterProvider';
import userEvent from '@testing-library/user-event';

describe('Testa componentes do app Star Wars', () => {

  let columnSelect;
  let comparisonSelect;
  let filterBtn;
  let removeBtn;
  let inputValue;
  let inputName;
  let orderSelect;
  let orderBtn;

  beforeEach(() => {
    global.fetch = jest.fn(() => Promise.resolve({
      status: 200,
      ok: true,
      json: () => Promise.resolve(testData)
    }));
    render(
        <FilterProvider>
          <App />
        </FilterProvider>
    );

      columnSelect = screen.getByTestId('column-filter');
      comparisonSelect = screen.getByTestId('comparison-filter');
      filterBtn = screen.getByRole('button', {  name: /filtrar/i});
      inputValue = inputValue = screen.getByTestId('value-filter');
      inputName = screen.getByTestId('name-filter');
      removeBtn = screen.getByRole('button', {  name: /remover filtros/i});
      orderSelect = screen.getByTestId('column-sort');
      orderBtn = screen.getByRole('button', { name: /ordenar/i });

  })
  

  afterEach(() => global.fetch.mockClear());

  test('Verifica se foi realizado uma requisição a API', () => {
    expect(global.fetch).toHaveBeenCalled();
    expect(global.fetch).toHaveBeenCalledTimes(2);
    expect(global.fetch).toHaveBeenCalledWith('https://swapi.dev/api/planets');
  })
  test('Verifica se a pagina renderiza um campo de busca por nome', () => {
    expect(inputName).toBeInTheDocument();
  })
  test('Verifica se a pagina renderiza um menu de "coluna" e "operador"', () => {
    
    expect(columnSelect).toBeInTheDocument();
    expect(columnSelect.children).toHaveLength(5);
    expect(comparisonSelect).toBeInTheDocument();
    expect(comparisonSelect.children).toHaveLength(3);

  })
  test('Verifica se existe um input para adicionar o valor referente ao operador', () => {
    expect(inputValue).toBeInTheDocument();
  })
  test('Verifica se existe os botões de "FILTRAR" e de "REMOVER FILTROS"', () => {
    expect(filterBtn).toBeInTheDocument();
    expect(removeBtn).toBeInTheDocument();
    
    
  })
  test('Verifica comportamento do botão "FILTRAR" menor que', () => {
    userEvent.selectOptions(columnSelect, 'diameter');
    userEvent.selectOptions(comparisonSelect, 'menor que');
    userEvent.clear(inputValue);
    userEvent.type(inputValue, '9000');
    userEvent.click(filterBtn);

    expect(screen.getByText(/diameter menor que 9000/i)).toBeInTheDocument()
  })
  test('Verifica comportamento do botão "FILTRAR" maior que', () => {
    userEvent.selectOptions(columnSelect, 'orbital_period');
    userEvent.selectOptions(comparisonSelect, 'maior que');
    userEvent.clear(inputValue);
    userEvent.type(inputValue, '5000');
    userEvent.click(filterBtn);

    screen.getByText(/orbital_period maior que 5000/i);
  })
  test('Verifica comportamento do botão "FILTRAR" igual a', () => {
    userEvent.selectOptions(columnSelect, 'surface_water');
    userEvent.selectOptions(comparisonSelect, 'igual a');
    userEvent.clear(inputValue);
    userEvent.type(inputValue, '40');
    userEvent.click(filterBtn);

    screen.getByText(/surface_water igual a 40/i);
  })
  
})
describe('testa funções de orndear', () => {
  beforeEach(() => {
    global.fetch = jest.fn(() => Promise.resolve({
      status: 200,
      ok: true,
      json: () => Promise.resolve(testData)
    }));
  });
  test('Verifica comportamento do botão ', async () => {
    act(() => {
      render(
        <FilterProvider>
          <App />
        </FilterProvider>
      );
    })
    await waitForElementToBeRemoved(screen.queryByText('Carregando...'));
  })
})

