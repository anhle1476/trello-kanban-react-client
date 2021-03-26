import { SECURITY, GLOBAL } from "../type";
const initialState = {
  errors: [],
  ready: false,
};

export default function globalReducer(state = initialState, action) {
  switch (action.type) {
    case SECURITY.UPDATE_TOKEN_STATUS:
    case GLOBAL.START_LOADING:
      return {
        ...state,
        ready: false,
      };
    case GLOBAL.FINISH_LOADING:
      return {
        ...state,
        ready: true,
      };
    default:
      return state;
  }
}
