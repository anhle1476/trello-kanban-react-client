import axios from "axios";
import { BOARD } from "../type";

export const fetchCurrentBoard = (boardId) => async (dispatch) => {
  dispatch({ type: BOARD.START_FETCHING });
  try {
    const response = await axios.get(
      `http://localhost:8080/api/v1/boards/${boardId}`
    );

    dispatch({
      type: BOARD.FETCH_CURRENT_BOARD,
      payload: response.data,
    });
  } catch (ex) {
    console.log(ex.response.data);
  } finally {
    dispatch({ type: BOARD.FINISH_FETCHING });
  }
};
