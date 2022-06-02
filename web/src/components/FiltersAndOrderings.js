import React from 'react';

import { FiltersWrapper, Orderings, CurrencyFilters, CurrencyButton } from '../styles/ComponentStyles';

export default function CurrencyFilter({ currencyFilter, setCurrencyFilter }) {
  const switchFilter = (e) => {
    setCurrencyFilter(e.target.name);
  }

  return (
    <>
      <FiltersWrapper>
        <Orderings>
          <select>
            <option value='-date'>Sort by Date descending (default)</option>
            <option value='date'>Sort by Date ascending</option>
            <option value='-amount_in_huf'>Sort by Amount descending</option>
            <option value='amount_in_huf'>Sort by Amount ascending</option>
          </select>
        </Orderings>
        <CurrencyFilters>
          <li>
            <CurrencyButton
              name=''
              onClick={(e) => switchFilter(e)}
              currencyFilter={currencyFilter}
            >
              ALL
            </CurrencyButton>
          </li>
          <li>
            <CurrencyButton
              name='HUF'
              onClick={(e) => switchFilter(e)}
              currencyFilter={currencyFilter}
            >
              HUF
            </CurrencyButton>
          </li>
          <li>
            <CurrencyButton
              name='USD'
              onClick={(e) => switchFilter(e)}
              currencyFilter={currencyFilter}
            >
              USD
            </CurrencyButton>
          </li>
        </CurrencyFilters>
      </FiltersWrapper>
    </>
  );
}
