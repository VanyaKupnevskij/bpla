import { createContext } from 'react';

function setItemQuery(key, value) {}
function clearItemQuery(key) {}

export const QueryContext = createContext({
  query: '',
  setItemQuery: setItemQuery,
  clearItemQuery: clearItemQuery,
});
