import ColumnOrderDifference from "./ColumnOrderDifference";
import CardOrderDifference from "./CardOrderDifference";

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

export const remapCardOrdersAndGetDifference = (oldCols, newCols) => {
  const differences = [];

  for (let i = 0; i < newCols.length; i++) {
    const currCol = newCols[i];
    for (let j = 0; j < currCol.cards.length; j++) {
      const currCard = currCol.cards[j];
      if (currCard.id !== oldCols[i][j]?.id) {
        differences.push(new CardOrderDifference(currCard.id, currCol.id, j));
        currCard.cardOrder = j;
      }
    }
  }

  return differences;
};
