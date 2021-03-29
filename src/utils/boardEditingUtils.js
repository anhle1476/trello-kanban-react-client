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

export const mapRestoreCard = (enabledId, columns) =>
  mapCardStatus(enabledId, columns, true);

export const mapColumnChanges = (event, colId, cols) =>
  cols.map((col) => {
    if (col.id === colId) col.title = event.target.value;
    return col;
  });

export const mapDisabledColumn = (disabledId, columns) =>
  columns.map((col) => {
    if (col.id === disabledId) col.status.enabled = false;
    return col;
  });

export const mapCreatedCard = (newCard, colId, columns) =>
  columns.map((col) => {
    if (col.id === colId) {
      col.cards.push(newCard);
    }
    return col;
  });
