import axios from "axios";
import { TYPE } from "./dragAndDropService";

const BASE_DOMAIN = "http://localhost:8080";
const API_VERSION = "v1";

const BASE_URL = `${BASE_DOMAIN}/api/${API_VERSION}`;

export const getAllBoardsInfo = () => axios.get(`${BASE_URL}/boards`);

export const createBoard = (newBoard) =>
  axios.post(`${BASE_URL}/boards`, newBoard);

export const getBoardById = (boardId) =>
  axios.get(`${BASE_URL}/boards/${boardId}`);

export const updateBoard = (boardId, data) =>
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

export const enableColumn = (boardId, columnId) => {
  const requestUrl = `${BASE_URL}/boards/${boardId}/columns/${columnId}/enable`;
  return axios.put(requestUrl);
};

export const addCard = (boardId, colId, title) => {
  const requestUrl = `${BASE_URL}/boards/${boardId}/columns/${colId}/cards`;
  return axios.post(requestUrl, { title });
};

export const editCard = (boardId, cardId, data) => {
  const requestUrl = `${BASE_URL}/boards/${boardId}/columns/0/cards/${cardId}`;
  return axios.put(requestUrl, data);
};

export const disableCard = (boardId, cardId) => {
  const requestUrl = `${BASE_URL}/boards/${boardId}/columns/0/cards/${cardId}`;
  return axios.delete(requestUrl);
};

export const deleteCard = (boardId, cardId) => {
  const requestUrl = `${BASE_URL}/boards/${boardId}/columns/0/cards/${cardId}?type=permanent`;
  return axios.delete(requestUrl);
};

export const enableCard = (boardId, cardId) => {
  const requestUrl = `${BASE_URL}/boards/${boardId}/columns/0/cards/${cardId}/enable`;
  return axios.put(requestUrl);
};

export const dragAndDropPersist = (boardId, type, differ) => {
  const requestUrl = `${BASE_URL}/dnd/${boardId}/${
    type === TYPE.COLUMNS ? "columns" : "cards"
  }`;
  //console.log(differ);
  return axios.put(requestUrl, differ);
};
