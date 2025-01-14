import React, { useEffect, useState } from 'react';
import Form from './components/Form';
import FiltersAndOrderings from './components/FiltersAndOrderings';
import SpendingList from './components/SpendingList';
import Layout from './components/Layout';
import qs from "qs";
import { createBrowserHistory } from "history";

export default function App() {
  const [spendings, setSpendings] = useState([]);
  const [currencyFilter, setCurrencyFilter] = useState('');
  const [ordering, setOrdering] = useState('-desc');
  const history = createBrowserHistory();
  
  useEffect(() => {
    const filterParams = history.location.search.substr(1);
    const filtersFromParams = qs.parse(filterParams);
    if (filtersFromParams.currencyFilter) {
      setCurrencyFilter(String(filtersFromParams.currencyFilter));
    }
    if (filtersFromParams.ordering) {
      setOrdering(String(filtersFromParams.ordering));
    }
  }, []);

  useEffect(() => {
    history.push(`?currencyFilter=${currencyFilter}&ordering=${ordering}`);
  }, [currencyFilter, ordering]);

  return (
    <>
      <Layout>
        <Form />
        <FiltersAndOrderings
          currencyFilter={currencyFilter}
          setCurrencyFilter={setCurrencyFilter}
          ordering={ordering}
          setOrdering={setOrdering}
        />
        <SpendingList
          spendings={spendings}
          setSpendings={setSpendings}
          currencyFilter={currencyFilter}
          ordering={ordering}
        />
      </Layout>
    </>
  );
}
