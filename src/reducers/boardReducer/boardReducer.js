import { BOARD } from "../type";
const initialState = {
  boardInfo: {},
  cardColumns: [],
  isFetching: false,
};

export default function globalReducer(state = initialState, action) {
  switch (action.type) {
    case BOARD.FETCH_CURRENT_BOARD:
      const { cardColumns, ...boardInfo } = action.payload;
      return { ...state, boardInfo, cardColumns };
    case BOARD.START_FETCHING:
      return { ...state, isFetching: true };
    case BOARD.FINISH_FETCHING:
      return { ...state, isFetching: false };
    default:
      return state;
  }
}
