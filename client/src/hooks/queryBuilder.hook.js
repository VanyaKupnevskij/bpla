import { useEffect, useRef, useState } from 'react';
import { QueryContext } from '../context/queryContext';

import listParameters from '../context/listParameters';

export default function useQueryBuilder() {
  const query = useRef('');
  const queriesParameter = useRef({});

  useEffect(() => {
    initParameters();
  }, []);

  function buildQuery() {
    let resultQueries = [];
    for (let [key, value] of Object.entries(queriesParameter.current)) {
      switch (typeof value) {
        case 'object':
          for (let item of value.values()) {
            resultQueries.push(`${key}=${item}`);
          }
          break;

        case 'number':
          if (
            (key.includes('_min') && value === listParameters[key.replace('_min', '')].min) ||
            (key.includes('_max') && value === listParameters[key.replace('_max', '')].max)
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
    // TODO: add limit, sort, text (search), page
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

  function clearItemQuery(key) {
    // if (!queriesParameter[key] ?? false) return;
    // switch (typeof queriesParameter[key]) {
    //   case String:
    //     setQueriesParameter({ ...queriesParameter, [key]: new Set() });
    //     break;
    //   case Number:
    //     setQueriesParameter({
    //       ...queriesParameter,
    //       [`${key}_min`]: listParameters[key].min,
    //       [`${key}_max`]: listParameters[key].max,
    //     });
    //     break;
    // }
  }

  function QueryProvider({ children }) {
    return (
      <QueryContext.Provider
        value={{
          query,
          setItemQuery,
          clearItemQuery,
        }}>
        {children}
      </QueryContext.Provider>
    );
  }

  return { query, setItemQuery, clearItemQuery, QueryProvider };
}
