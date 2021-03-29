import React, { Component } from "react";
import "./KanbanBoard.style.scss";
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
} from "../../utils/request";
import {
  mapColumnChanges,
  mapDisabledColumn,
  mapEditedCardToColumns,
  mapDisabledCard,
  mapCreatedCard,
} from "../../utils/boardEditingUtils";
import HiddenAddForm from "../../components/HiddenAddForm/HiddenAddForm.component";
import EditCardModal from "../../components/EditCardModal/EditCardModal.component";

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

      this.setState({
        isFetching: false,
        editingCard: null,
        currentTitle: response.data.title,
        ...response.data,
      });
    } catch (ex) {
      console.log(ex.response.data);
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

  handleArchiveColumn = async (columnId) => {
    if (!window.confirm("Bạn có chắc chắn xóa cột này không?")) return;
    try {
      await disableColumn(this.state.id, columnId);
      this.setState({
        cardColumns: mapDisabledColumn(columnId, this.state.cardColumns),
      });
    } catch (ex) {
      console.log(ex);
    }
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
        </section>
        <section className="board-content">
          <div className="board-columns-container">
            {cardColumns
              .filter((col) => col.status.enabled)
              .map((col) => (
                <CardColumn
                  key={col.id}
                  handleColumnTitleChange={this.handleColumnTitleChange}
                  handleColumnTitleSubmit={this.handleColumnTitleSubmit}
                  handleArchiveColumn={this.handleArchiveColumn}
                  handleAddCard={this.handleAddCard}
                  toggleEditCardModal={this.handleToggleModal}
                  {...col}
                />
              ))}
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
        </section>
      </div>
    );
  }
}

export default KanbanBoard;
