import React, { Component } from "react";
import "./KanbanBoard.style.scss";
import { DragDropContext, Droppable } from "react-beautiful-dnd";
import Loader from "../../components/Loader/Loader.component";
import CardColumn from "../../components/CardColumn/CardColumn.component";
import TransparentForm from "../../components/TransparentForm/TransparentForm.component";
import {
  getBoardById,
  updateBoardTitle,
  updateColumnTitle,
  addColumn,
  addCard,
  disableColumn,
  editCard,
  disableCard,
  dragAndDropPersist,
} from "../../services/requestService";
import {
  sortData,
  mapColumnChanges,
  mapDisabledColumn,
  mapEditedCardToColumns,
  mapDisabledCard,
  mapCreatedCard,
  disableColumnConfirm,
  disableCardConfirm,
} from "../../services/boardEditingService";
import {
  TYPE,
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
        isFetching: false,
        editingCard: null,
        currentTitle: boardData.title,
        ...boardData,
      });
    } catch (ex) {
      console.log(ex);
      this.setState({
        isFetching: false,
      });
    }
  };

  handleTitleChange = ({ target }) => {
    this.setState({ title: target.value });
  };

  handleTitleSubmit = async () => {
    const { title, currentTitle, id, color } = this.state;
    if (title === currentTitle) return;
    try {
      const formData = {
        id,
        title,
        color,
      };
      await updateBoardTitle(id, formData);
      this.setState({ currentTitle: title });
    } catch (ex) {
      console.log(ex);
    }
  };

  handleColumnTitleChange = (e, id) => {
    const columns = mapColumnChanges(e, id, this.state.cardColumns);
    this.setState({ cardColumns: columns });
  };

  handleColumnTitleSubmit = async (id) => {
    const { cards, status, ...formData } = this.state.cardColumns.find(
      (col) => col.id === id
    );
    try {
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
        await disableColumn(this.state.id, columnId);
        this.setState({
          cardColumns: mapDisabledColumn(columnId, this.state.cardColumns),
        });
      } catch (ex) {
        console.log(ex);
      }
    });
  };

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
        await disableCard(id, editingCard.id);
        const newColsData = mapDisabledCard(editingCard.id, cardColumns);
        this.setState({
          cardColumns: newColsData,
          editingCard: null,
        });
      } catch (ex) {
        console.log(ex);
      }
    });
  };

  onDragEnd = async (result) => {
    const { destination, source, type } = result;
    const { cardColumns, id } = this.state;
    if (
      !destination ||
      (destination.droppableId === source.droppableId &&
        destination.index === source.index)
    )
      return;
    let mapped, differ;
    if (type === TYPE.COLUMNS) {
      mapped = getRemappedColumns(cardColumns, result);
      differ = remapColumnOrdersAndGetDifference(mapped);
    } else {
      mapped = getRemappedCards(cardColumns, result);
      differ = remapCardOrdersAndGetDifference(cardColumns, mapped);
    }
    this.setState({ cardColumns: mapped });
    try {
      await dragAndDropPersist(id, type, differ);
    } catch (ex) {
      console.log(ex);
    }
  };

  render() {
    const { title, color, cardColumns, isFetching, editingCard } = this.state;
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
          <SideMenu />
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
