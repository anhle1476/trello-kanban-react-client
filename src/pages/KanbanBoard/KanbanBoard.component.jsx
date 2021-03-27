import React, { Component } from "react";
import "./KanbanBoard.style.scss";
import Loader from "../../components/Loader/Loader.component";
import axios from "axios";

class KanbanBoard extends Component {
  constructor(props) {
    super(props);

    this.state = {
      id: 2,
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
      const response = await axios.get(
        `http://localhost:8080/api/v1/boards/${boardId}`
      );

      this.setState({
        isFetching: false,
        currentTitle: response.data.title,
        ...response.data,
      });
    } catch (ex) {
      console.log(ex.response.data);
    }
  };

  handleTitleChange = ({ target }) => {
    this.setState({ title: target.value });
  };

  handleUpdateTitle = async (e) => {
    e.preventDefault();
    if (e.type === "submit") {
      e.target[0].blur();
      return;
    }
    const { title, currentTitle, id, color } = this.state;
    if (title === currentTitle) return;
    try {
      await axios.put(`http://localhost:8080/api/v1/boards/${id}`, {
        id,
        title: title,
        color: color,
      });
      this.setState({ ...this.state, currentTitle: title });
    } catch (ex) {
      console.log(ex.response);
    }
  };

  render() {
    const { id, title, color, status, cardColumns, isFetching } = this.state;
    if (isFetching) {
      return <Loader />;
    }
    return (
      <div className="board-container" style={{ backgroundColor: color }}>
        <section className="board-info">
          <h2 className="box white-box p-0">
            <form onSubmit={this.handleUpdateTitle}>
              <input
                type="text"
                onChange={this.handleTitleChange}
                onBlur={this.handleUpdateTitle}
                className="box-input"
                value={title}
              />
            </form>
          </h2>
        </section>
      </div>
    );
  }
}

export default KanbanBoard;
