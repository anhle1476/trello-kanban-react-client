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
} from "../../request";
import HiddenAddForm from "../../components/HiddenAddForm/HiddenAddForm.component";

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
      await updateBoardTitle(id, {
        id,
        title,
        color,
      });
      this.setState({ currentTitle: title });
    } catch (ex) {
      console.log(ex);
    }
  };

  handleColumnTitleChange = (e, id) => {
    const columns = this.state.cardColumns.map((col) => {
      if (col.id === id) col.title = e.target.value;
      return col;
    });
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

  handleAddCard = async (title, colId) => {
    try {
      const response = await addCard(this.state.id, colId, title);
      const columns = this.state.cardColumns.map((col) => {
        if (col.id === colId) {
          col.cards.push(response.data);
        }
        return col;
      });
      this.setState({ cardColumns: columns });
    } catch (ex) {
      console.log(ex);
    }
  };

  render() {
    const { title, color, cardColumns, isFetching } = this.state;
    if (isFetching) {
      return <Loader />;
    }
    return (
      <div className="board-container" style={{ backgroundColor: color }}>
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
                  handleAddCard={this.handleAddCard}
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
