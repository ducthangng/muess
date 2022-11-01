import * as types from './constants';

const reducer = (
  state: {
    isLoading: boolean;
  },
  { type, payload }: any
) => {
  switch (type) {
    case types.SET_IS_LOADING: {
      return {
        ...state,
        isLoading: payload
      };
    }
    default:
      return state;
  }
};

export default reducer;
