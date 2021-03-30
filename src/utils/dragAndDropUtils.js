import ColumnOrderDifference from "./ColumnOrderDifference";
import CardOrderDifference from "./CardOrderDifference";

export const TYPE = {
  COLUMNS: "COLUMNS",
  CARDS: "CARDS",
};

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
  const differences = [];

  for (let i = 0; i < cols.length; i++) {
    const currCol = cols[i];
    if (currCol.columnOrder !== i) {
      differences.push(new ColumnOrderDifference(currCol.id, i));
      currCol.columnOrder = i;
    }
  }

  return differences;
};

export const getRemappedCards = (columns, { destination, source }) => {
  console.log("------------------------------------------");
  console.log("REMAP PHASE:");
  debugCol(columns);
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
  console.log("FINISH REMAP PHASE:");
  debugCol(columns);
  debugCol(result);
  return result;
};

export const remapCardOrdersAndGetDifference = (oldCols, newCols) => {
  console.log("------------------------------------------");
  console.log("REMAP INDEX PHASE:");
  debugCol(oldCols);
  debugCol(newCols);

  const differences = {};

  for (let i = 0; i < newCols.length; i++) {
    const currCol = newCols[i];

    for (let j = 0; j < currCol.cards.length; j++) {
      const currCard = currCol.cards[j];

      if (currCard.id !== oldCols[i].cards[j]?.id) {
        console.log(currCard.id + " - " + oldCols[i][j]?.id);
        differences[currCard.id] = new CardOrderDifference(currCol.id, j);
        currCard.cardOrder = j;
      }
    }
  }

  return differences;
};

function debugCol(cols) {
  console.log(
    cols.map((col) => col.title + ":" + col.cards.length).join(" - ")
  );
}
