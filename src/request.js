import axios from "axios";

export const getBoardById = (boardId) =>
  axios.get(`http://localhost:8080/api/v1/boards/${boardId}`);

export const updateBoardTitle = (boardId, data) =>
  axios.put(`http://localhost:8080/api/v1/boards/${boardId}`, data);

export const addColumn = (boardId, title) => {
  const requestUrl = `http://localhost:8080/api/v1/boards/${boardId}/columns`;
  return axios.post(requestUrl, { title });
};

export const updateColumnTitle = (boardId, columnId, data) => {
  const requestUrl = `http://localhost:8080/api/v1/boards/${boardId}/columns/${columnId}`;
  return axios.put(requestUrl, data);
};
