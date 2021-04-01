import { confirmAlert } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css";

export const mapEditedCardToColumns = (edited, columns) =>
  columns.map((col) => {
    col.cards = col.cards.map((card) =>
      card.id !== edited.id ? card : edited
    );
    return col;
  });

const mapCardStatus = (archivedId, columns, isEnabled) =>
  columns.map((col) => {
    col.cards = col.cards.map((card) => {
      if (card.id === archivedId) card.status.enabled = isEnabled;
      return card;
    });
    return col;
  });

export const mapDisabledCard = (disabledId, columns) =>
  mapCardStatus(disabledId, columns, false);

export const mapEnableCard = (enabledId, columns) =>
  mapCardStatus(enabledId, columns, true);

export const mapDeletedCard = (cardId, columns) =>
  columns.map((col) => ({
    ...col,
    cards: col.cards.filter((card) => card.id !== cardId),
  }));

export const mapColumnChanges = (event, colId, cols) =>
  cols.map((col) => {
    if (col.id === colId) col.title = event.target.value;
    return col;
  });

export const mapDisabledColumn = (colId, columns) =>
  columns.map((col) => {
    if (col.id === colId) col.status.enabled = false;
    return col;
  });

export const mapEnabledColumn = (colId, columns) =>
  columns.map((col) => {
    if (col.id === colId) col.status.enabled = true;
    return col;
  });

export const mapCreatedCard = (newCard, colId, columns) =>
  columns.map((col) => {
    if (col.id === colId) {
      col.cards.push(newCard);
    }
    return col;
  });

export const disableColumnConfirm = (doDisable) => {
  confirmAlert({
    title: "Ẩn cột",
    message: "Bạn có chắc chắn ẩn cột này không",
    buttons: [
      {
        label: "Có",
        onClick: doDisable,
      },
      {
        label: "Không",
      },
    ],
  });
};

export const disableCardConfirm = (doDisable) => {
  confirmAlert({
    title: "Ẩn thẻ",
    message: "Bạn có chắc chắn ẩn thẻ này không",
    buttons: [
      {
        label: "Có",
        onClick: doDisable,
      },
      {
        label: "Không",
      },
    ],
  });
};

export const deleteCardConfirm = (doDelete) => {
  confirmAlert({
    title: "Xóa thẻ",
    message:
      "Bạn có chắc chắn muốn xóa thẻ này không? \n(Hành động này không thể khôi phục được)",
    buttons: [
      {
        label: "Có",
        onClick: doDelete,
      },
      {
        label: "Không",
      },
    ],
  });
};

export const deleteBoardConfirm = (doDelete) => {
  confirmAlert({
    title: "Xóa bảng",
    message:
      "Bạn có chắc chắn muốn xóa bảng này không? (Hành động này sẽ xóa tất cả nội dung bên trong và không thể khôi phục được)",
    buttons: [
      {
        label: "Có",
        onClick: doDelete,
      },
      {
        label: "Không",
      },
    ],
  });
};

export const sortData = (data) => {
  data.cardColumns.sort((col1, col2) => col1.columnOrder - col2.columnOrder);
  data.cardColumns.forEach((col) => {
    col.cards.sort((c1, c2) => c1.cardOrder - c2.cardOrder);
  });
};
