import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { setElement } from '../store/currentBplaSlice';

export function useSaveValueOnChange(newValue, nameField, trigger) {
  const dispatch = useDispatch();
  const [isSave, setIsSave] = useState(0);

  useEffect(() => {
    dispatch(setElement({ value: newValue, name: nameField }));
    setIsSave((prev) => prev + 1);
  }, [trigger]);

  return { isSave };
}
