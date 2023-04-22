import { useEffect, useRef } from 'react';
import { QueryContext } from '../context/queryContext';

import listParameters from '../context/listParameters';

export default function useQueryBuilder() {
  const query = useRef('');
  const queriesParameter = useRef({});
  const onChange = useRef(null);

  useEffect(() => {
    initParameters();
  }, []);

  function buildQuery() {
    let resultQueries = [];
    for (let [key, value] of Object.entries(queriesParameter.current)) {
      switch (typeof value) {
        case 'object':
          for (let item of value.values()) {
            resultQueries.push(`${key}_str=${item}`);
          }
          break;

        case 'number':
          if (
            (key.includes('_min') && value === listParameters[key.replace('_min', '')].min) ||
            (key.includes('_max') && value === listParameters[key.replace('_max', '')].max) ||
            (key === 'limit' && value === 0) ||
            (key === 'page' && value === 0) ||
            (key === 'order' && value === 1)
          )
            break;

          resultQueries.push(`${key}=${value}`);
          break;
      }
    }

    if (resultQueries.length !== 0) {
      query.current = '?' + resultQueries.join('&');
    } else {
      query.current = '';
    }
  }

  function initParameters() {
    for (let key in listParameters) {
      if (listParameters[key].isFilter) {
        switch (listParameters[key].type) {
          case 'TextInput':
          case 'SelectInput':
          case 'MultipleSelect':
            queriesParameter.current[listParameters[key].name] = new Set();
            break;
          case 'NumberSlider':
            queriesParameter.current[`${listParameters[key].name}_min`] = listParameters[key].min;
            queriesParameter.current[`${listParameters[key].name}_max`] = listParameters[key].max;
            break;
        }
      }
    }

    queriesParameter.current.text = new Set();
    queriesParameter.current.limit = 0;
    queriesParameter.current.page = 0;
    queriesParameter.current.order = 1;
    queriesParameter.current.sort = new Set();
  }

  function setItemQuery(key, value, isAppend = true, replaceText = false) {
    if (queriesParameter.current[key] === undefined) return;

    if (typeof value == 'string') {
      if (value === '') {
        queriesParameter.current[key].clear();
      } else {
        if (replaceText) {
          queriesParameter.current[key].clear();
        }

        if (isAppend) {
          queriesParameter.current[key].add(value);
        } else {
          queriesParameter.current[key].delete(value);
        }
      }
    } else if (typeof value == 'number') {
      queriesParameter.current[key] = value;
    }

    buildQuery();
  }

  function clearQuery() {
    initParameters();
    buildQuery();
  }

  function submit() {
    onChange.current();
  }

  function QueryProvider({ children }) {
    return (
      <QueryContext.Provider
        value={{
          query,
          setItemQuery,
          clearQuery,
          onChange,
          submit,
        }}>
        {children}
      </QueryContext.Provider>
    );
  }

  return { query, setItemQuery, clearQuery, onChange, submit, QueryProvider };
}
