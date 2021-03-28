import axios from "axios";

const BASE_DOMAIN = "http://localhost:8080";
const API_VERSION = "v1";

const BASE_URL = `${BASE_DOMAIN}/api/${API_VERSION}`;

export const getAllBoardsInfo = () => axios.get(`${BASE_URL}/boards`);

export const createBoard = (newBoard) =>
  axios.post(`${BASE_URL}/boards`, newBoard);

export const getBoardById = (boardId) =>
  axios.get(`${BASE_URL}/boards/${boardId}`);

export const updateBoardTitle = (boardId, data) =>
  axios.put(`${BASE_URL}/boards/${boardId}`, data);

export const addColumn = (boardId, title) => {
  const requestUrl = `${BASE_URL}/boards/${boardId}/columns`;
  return axios.post(requestUrl, { title });
};

export const updateColumnTitle = (boardId, columnId, data) => {
  const requestUrl = `${BASE_URL}/boards/${boardId}/columns/${columnId}`;
  return axios.put(requestUrl, data);
};

export const disableColumn = (boardId, columnId) => {
  const requestUrl = `${BASE_URL}/boards/${boardId}/columns/${columnId}`;
  return axios.delete(requestUrl);
};

export const addCard = (boardId, colId, title) => {
  const requestUrl = `${BASE_URL}/boards/${boardId}/columns/${colId}/cards`;
  return axios.post(requestUrl, { title });
};
