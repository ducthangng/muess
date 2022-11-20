import React, { useReducer, useContext, createContext } from 'react';
import reducer from './reducer';
import * as types from './constants';

interface InitialStateType {
  isLoading: boolean;
  setIsLoading: (isLoading: boolean) => void;
}

const initialState: InitialStateType = {
  isLoading: false,
  setIsLoading: () => {}
};

const GlobalContext = createContext<InitialStateType>(initialState);

const GlobalProvider = (parameter: { children: React.ReactNode }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const handleSetIsLoading = (isLoading: boolean) => {
    dispatch({
      type: types.SET_IS_LOADING,
      payload: isLoading
    });
  };

  return (
    <GlobalContext.Provider
      value={{
        ...state,
        setIsLoading: handleSetIsLoading
      }}
    >
      {parameter.children}
    </GlobalContext.Provider>
  );
};

const useGlobalContext = () => useContext(GlobalContext);

export { GlobalContext, GlobalProvider, useGlobalContext };
