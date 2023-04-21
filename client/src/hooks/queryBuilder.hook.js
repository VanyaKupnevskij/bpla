import { useEffect, useState } from 'react';
import { QueryContext } from '../context/queryContext';

import listParameters from '../context/listParameters';

export default function useQueryBuilder() {
  const [query, setQuery] = useState('');
  const [queriesParameter, setQueriesParameter] = useState({});

  useEffect(() => {
    initParameters();
  }, []);

  useEffect(() => {
    let resultQueries = [];
    for (let [key, value] in queriesParameter) {
      switch (typeof value) {
        case String:
          if (!value) break;
          resultQueries.push(`${key}=${value}`);
          break;

        case Number:
          if (
            (key.includes('_min') && value === listParameters[key].min) ||
            (key.includes('_max') && value === listParameters[key].max)
          )
            break;

          resultQueries.push(`${key}=${value}`);
          break;
      }
    }

    if (resultQueries.length !== 0) {
      setQuery('?' + resultQueries.join('&'));
    }
  }, [queriesParameter]);

  function initParameters() {
    let tempQueries = [];

    for (let key in listParameters) {
      if (listParameters[key].isFilter) {
        switch (listParameters[key].type) {
          case 'TextInput':
          case 'SelectInput':
          case 'MultipleSelect':
            tempQueries[key] = null;
            break;
          case 'NumberSlider':
            tempQueries[`${key}_min`] = listParameters[key].min;
            tempQueries[`${key}_max`] = listParameters[key].max;
            break;
        }
      }
    }

    setQueriesParameter(tempQueries);
  }

  function setValue(key, value) {
    if (!queriesParameter[key]) return;

    setQueriesParameter({ ...queriesParameter, [key]: value });
  }

  function clearValue(key) {
    if (!queriesParameter[key]) return;

    switch (typeof queriesParameter[key]) {
      case String:
        setQueriesParameter({ ...queriesParameter, [key]: null });
        break;
      case Number:
        setQueriesParameter({
          ...queriesParameter,
          [`${key}_min`]: listParameters[key].min,
          [`${key}_max`]: listParameters[key].max,
        });
        break;
    }
  }

  function QueryProvider({ children }) {
    return (
      <QueryContext.Provider
        value={{
          query,
        }}>
        {children}
      </QueryContext.Provider>
    );
  }

  return { query, setValue, clearValue, QueryProvider };
}
