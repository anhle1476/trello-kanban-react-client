import CardOrderDifference from "./CardOrderDifference";

export const TYPE = {
  COLUMNS: "COLUMNS",
  CARDS: "CARDS",
};

export const isOrderUnchanged = ({ destination, source }) =>
  !destination ||
  (destination.droppableId === source.droppableId &&
    destination.index === source.index);

export const getRemappedColumns = (columns, { destination, source }) => {
  let srcIndex = source.index;
  let destIndex = destination.index;
  columns.forEach((col, index) => {
    if (!col.status.enabled) {
      if (srcIndex >= index) srcIndex++;
      if (destIndex >= index) destIndex++;
    }
  });

  const result = Array.from(columns);
  const dragObj = result.splice(srcIndex, 1);
  result.splice(destIndex, 0, ...dragObj);
  return result;
};

export const remapColumnOrdersAndGetDifference = (cols) => {
  const differences = {};

  for (let i = 0; i < cols.length; i++) {
    const currCol = cols[i];
    if (currCol.columnOrder !== i) {
      differences[currCol.id] = i;
      currCol.columnOrder = i;
    }
  }

  return differences;
};

export const getRemappedCards = (columns, { destination, source }) => {
  const result = columns.map((col) => ({
    ...col,
    cards: [...col.cards],
  }));
  const destId = Number(destination.droppableId);
  const srcId = Number(source.droppableId);
  let srcIndex = source.index;
  let destIndex = destination.index;
  columns.forEach(({ id, cards }) => {
    if (id === srcId) {
      cards.forEach((card, index) => {
        if (!card.status.enabled) {
          if (srcIndex >= index) srcIndex++;
        }
      });
    }
    if (id === destId) {
      cards.forEach((card, index) => {
        if (!card.status.enabled) {
          if (destIndex >= index) destIndex++;
        }
      });
    }
  });

  let dragObj;
  for (let col of result) {
    if (col.id === srcId) {
      dragObj = col.cards.splice(srcIndex, 1);
      break;
    }
  }
  for (let col of result) {
    if (col.id === destId) {
      col.cards.splice(destIndex, 0, ...dragObj);
      break;
    }
  }

  return result;
};

export const remapCardOrdersAndGetDifference = (oldCols, newCols) => {
  const differences = {};

  for (let i = 0; i < newCols.length; i++) {
    const currCol = newCols[i];

    for (let j = 0; j < currCol.cards.length; j++) {
      const currCard = currCol.cards[j];

      if (currCard.id !== oldCols[i].cards[j]?.id) {
        differences[currCard.id] = new CardOrderDifference(currCol.id, j);
        currCard.cardOrder = j;
      }
    }
  }

  return differences;
};
