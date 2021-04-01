import React, { Component } from "react";
import "./KanbanBoard.style.scss";
import { DragDropContext, Droppable } from "react-beautiful-dnd";
import Loader from "../../components/Loader/Loader.component";
import CardColumn from "../../components/CardColumn/CardColumn.component";
import TransparentForm from "../../components/TransparentForm/TransparentForm.component";
import {
  getBoardById,
  updateBoard,
  disableBoard,
  updateColumnTitle,
  addColumn,
  addCard,
  disableColumn,
  enableColumn,
  editCard,
  disableCard,
  deleteCard,
  enableCard,
  dragAndDropPersist,
} from "../../services/requestService";
import {
  sortData,
  mapColumnChanges,
  mapDisabledColumn,
  mapEnabledColumn,
  mapEditedCardToColumns,
  mapDisabledCard,
  mapDeletedCard,
  mapEnableCard,
  mapCreatedCard,
  disableColumnConfirm,
  disableCardConfirm,
  deleteCardConfirm,
} from "../../services/boardEditingService";
import {
  TYPE,
  isOrderUnchanged,
  getRemappedColumns,
  remapColumnOrdersAndGetDifference,
  getRemappedCards,
  remapCardOrdersAndGetDifference,
} from "../../services/dragAndDropService";
import HiddenAddForm from "../../components/HiddenAddForm/HiddenAddForm.component";
import EditCardModal from "../../components/EditCardModal/EditCardModal.component";
import SideMenu from "../../components/SideMenu/SideMenu.component";

class KanbanBoard extends Component {
  constructor(props) {
    super(props);

    this.state = {
      id: 0,
      title: "",
      color: "#f00",
      status: {},
      cardColumns: [],
      isFetching: true,
      currentTitle: "",
      editingCard: null,
      searchByTitle: "",
      searchByLabel: "",
    };
  }

  componentDidMount() {
    this.fetchCurrentBoard(this.props.match.params.boardId);
  }

  fetchCurrentBoard = async (boardId) => {
    try {
      const response = await getBoardById(boardId);
      const boardData = response.data;
      sortData(boardData);

      this.setState({
        ...this.state,
        currentTitle: boardData.title,
        isFetching: false,
        ...boardData,
      });
    } catch (ex) {
      console.log(ex);
      this.setState({
        isFetching: false,
      });
    }
  };

  /*********** EDIT BOARD ***********/

  handleTitleChange = ({ target }) => {
    this.setState({ title: target.value });
  };

  handleTitleSubmit = async () => {
    const { title, currentTitle } = this.state;
    if (title === currentTitle) return;
    try {
      this.setState({ currentTitle: title }, this.requestUpdateBoard);
    } catch (ex) {
      console.log(ex);
    }
  };

  handleBoardColorChange = (result) => {
    try {
      this.setState({ color: result.hex }, this.requestUpdateBoard);
    } catch (ex) {
      console.log(ex);
    }
  };

  requestUpdateBoard = async () => {
    const { title, id, color } = this.state;
    return await updateBoard(id, {
      id,
      title,
      color,
    });
  };

  handleDisableBoard = async () => {
    try {
      await disableBoard(this.state.id);
      this.props.history.push("/dashboard");
    } catch (ex) {
      console.log(ex);
    }
  };

  /*********** EDIT COLUMNS ***********/

  handleColumnTitleChange = (e, id) => {
    const columns = mapColumnChanges(e, id, this.state.cardColumns);
    this.setState({ cardColumns: columns });
  };

  handleColumnTitleSubmit = async (id) => {
    try {
      const { cards, status, ...formData } = this.state.cardColumns.find(
        (col) => col.id === id
      );
      await updateColumnTitle(this.state.id, id, formData);
    } catch (ex) {
      console.log(ex);
    }
  };

  handleAddColumn = async (title) => {
    try {
      const response = await addColumn(this.state.id, title);
      const newColumn = response.data;
      newColumn.cards = [];
      this.setState({
        cardColumns: [...this.state.cardColumns, newColumn],
      });
    } catch (ex) {
      console.log(ex);
    }
  };

  handleDisableColumn = (columnId) => {
    disableColumnConfirm(async () => {
      try {
        this.setState({
          cardColumns: mapDisabledColumn(columnId, this.state.cardColumns),
        });
        await disableColumn(this.state.id, columnId);
      } catch (ex) {
        console.log(ex);
      }
    });
  };

  handleEnableColumn = async (columnId) => {
    try {
      this.setState({
        cardColumns: mapEnabledColumn(columnId, this.state.cardColumns),
      });
      await enableColumn(this.state.id, columnId);
    } catch (ex) {
      console.log(ex);
    }
  };

  /*********** EDIT CARD ***********/

  handleAddCard = async (title, colId) => {
    try {
      const { cardColumns, id } = this.state;
      const response = await addCard(id, colId, title);
      const columns = mapCreatedCard(response.data, colId, cardColumns);
      this.setState({ cardColumns: columns });
    } catch (ex) {
      console.log(ex);
    }
  };

  handleToggleModal = (editingCard) => {
    this.setState({ editingCard: editingCard });
  };

  handleEditCard = ({ name, value }) => {
    const newState = { ...this.state.editingCard, [name]: value };
    this.setState({ editingCard: newState });
  };

  handleSubmitEditedCard = async () => {
    const { id, editingCard, cardColumns } = this.state;
    try {
      const response = await editCard(id, editingCard.id, editingCard);
      const newColsData = mapEditedCardToColumns(response.data, cardColumns);
      this.setState({
        cardColumns: newColsData,
        editingCard: null,
      });
    } catch (ex) {
      console.log(ex);
    }
  };

  handleDisableCard = async () => {
    disableCardConfirm(async () => {
      const { id, editingCard, cardColumns } = this.state;
      try {
        this.setState({
          cardColumns: mapDisabledCard(editingCard.id, cardColumns),
          editingCard: null,
        });
        await disableCard(id, editingCard.id);
      } catch (ex) {
        console.log(ex);
      }
    });
  };

  handleEnableCard = async (cardId) => {
    const { id, cardColumns } = this.state;
    try {
      this.setState({
        cardColumns: mapEnableCard(cardId, cardColumns),
      });
      await enableCard(id, cardId);
    } catch (ex) {
      console.log(ex);
    }
  };

  handleDeleteCard = (cardId) => {
    deleteCardConfirm(async () => {
      const { id, cardColumns } = this.state;
      try {
        this.setState({
          cardColumns: mapDeletedCard(cardId, cardColumns),
        });
        await deleteCard(id, cardId);
      } catch (ex) {
        console.log(ex);
      }
    });
  };

  /*********** DRAG AND DROP ***********/
  onDragEnd = async (result) => {
    const { cardColumns, id } = this.state;
    if (isOrderUnchanged(result)) return;
    let mapped, differ;
    if (result.type === TYPE.COLUMNS) {
      mapped = getRemappedColumns(cardColumns, result);
      differ = remapColumnOrdersAndGetDifference(mapped);
    } else {
      mapped = getRemappedCards(cardColumns, result);
      differ = remapCardOrdersAndGetDifference(cardColumns, mapped);
    }
    this.setState({ cardColumns: mapped });
    try {
      await dragAndDropPersist(id, result.type, differ);
    } catch (ex) {
      console.log(ex);
    }
  };

  /*********** SEARCHING ***********/
  handleSearchByTitle = (value) => {
    this.setState({ searchByTitle: value });
  };

  handleSearchByLabel = (value) => {
    this.setState({ searchByLabel: value });
  };

  /*********** REACT RENDER METHOD ***********/
  render() {
    const {
      title,
      color,
      cardColumns,
      isFetching,
      editingCard,
      searchByTitle,
      searchByLabel,
    } = this.state;
    if (isFetching) {
      return <Loader />;
    }
    return (
      <div className="board-container" style={{ backgroundColor: color }}>
        {editingCard && (
          <EditCardModal
            handleChange={this.handleEditCard}
            editingCard={editingCard}
            toggleModal={this.handleToggleModal}
            handleSubmit={this.handleSubmitEditedCard}
            handleDelete={this.handleDisableCard}
          />
        )}
        <section className="board-info">
          <h2 className="box white-box p-0">
            <TransparentForm
              value={title}
              handleChange={this.handleTitleChange}
              handleChangeComplete={this.handleTitleSubmit}
            />
          </h2>
          <SideMenu
            handleBoardColorChange={this.handleBoardColorChange}
            handleSearchByTitle={this.handleSearchByTitle}
            handleSearchByLabel={this.handleSearchByLabel}
            handleEnableColumn={this.handleEnableColumn}
            handleEnableCard={this.handleEnableCard}
            handleDeleteCard={this.handleDeleteCard}
            handleDisableBoard={this.handleDisableBoard}
            {...this.state}
          />
        </section>
        <section className="board-content">
          <DragDropContext onDragEnd={this.onDragEnd}>
            <Droppable
              droppableId="all-columns"
              direction="horizontal"
              type={TYPE.COLUMNS}
            >
              {(provided) => (
                <div
                  className="board-columns-container"
                  {...provided.droppableProps}
                  ref={provided.innerRef}
                >
                  {cardColumns
                    .filter((col) => col.status.enabled)
                    .map((col, index) => (
                      <CardColumn
                        index={index}
                        key={col.id}
                        handleColumnTitleChange={this.handleColumnTitleChange}
                        handleColumnTitleSubmit={this.handleColumnTitleSubmit}
                        handleDisableColumn={this.handleDisableColumn}
                        handleAddCard={this.handleAddCard}
                        toggleEditCardModal={this.handleToggleModal}
                        searchByTitle={searchByTitle.toLowerCase()}
                        searchByLabel={searchByLabel.toLowerCase()}
                        {...col}
                      />
                    ))}
                  {provided.placeholder}
                  <div className="column-container">
                    <div className="box add-column">
                      <HiddenAddForm
                        handleSubmit={this.handleAddColumn}
                        placeholder="Nhập tiêu đề cột..."
                      >
                        <p className="p-1">
                          <i className="fas fa-sm fa-plus"></i> Thêm cột mới
                        </p>
                      </HiddenAddForm>
                    </div>
                  </div>
                </div>
              )}
            </Droppable>
          </DragDropContext>
        </section>
      </div>
    );
  }
}

export default KanbanBoard;
