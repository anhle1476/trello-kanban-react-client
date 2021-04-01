import "./Dashboard.style.scss";

import React, { Component } from "react";
import { connect } from "react-redux";
import BoardPreview from "../../components/BoardPreview/BoardPreview.component";
import AddBoardModal from "../../components/AddBoardModal/AddBoardModal.component";
import ArchivedBoardsModal from "../../components/ArchivedBoardsModal/ArchivedBoardsModal.component";
import { getAllBoardsInfo, createBoard } from "../../services/requestService";
import { sortByLastedView } from "../../services/dateUtils";
import { enableBoard } from "../../services/requestService";

class Dashboard extends Component {
  constructor(props) {
    super(props);

    this.state = {
      boards: [],
      showModal: false,
      showArchivedBoards: false,
    };
  }

  componentDidMount() {
    this.fetchBoardData();
  }

  fetchBoardData = async () => {
    try {
      const response = await getAllBoardsInfo();
      this.setState({ boards: response.data });
    } catch (ex) {
      console.log(ex);
    }
  };

  toggleModal = () => {
    this.setState({ showModal: !this.state.showModal });
  };

  goToBoard = (e, id) => {
    this.props.history.push(`/boards/${id}`);
  };

  handleAddBoard = async (addForm) => {
    try {
      const response = await createBoard(addForm);
      this.setState({
        boards: [...this.state.boards, response.data],
        showModal: false,
      });
    } catch (ex) {
      console.log(ex);
    }
  };

  handleRestoreBoard = async (board) => {
    try {
      const availableBoards = [...this.state.boards, board];
      sortByLastedView(availableBoards);
      this.setState({
        boards: availableBoards,
      });
      await enableBoard(board.id);
    } catch (ex) {
      console.log(ex);
    }
  };

  toggleShowArchivedBoardsModal = () => {
    this.setState({ showArchivedBoards: !this.state.showArchivedBoards });
  };

  render() {
    const { boards, showModal, showArchivedBoards } = this.state;
    return (
      <div className="container">
        {showModal && (
          <AddBoardModal
            handleAddBoard={this.handleAddBoard}
            toggleModal={this.toggleModal}
          />
        )}

        <section className="dashboard-section">
          <h3 className="section-title">
            <i className="far fa-clock"></i> Xem gần đây
          </h3>
          <div className="section-previews">
            {boards.map((board) => (
              <BoardPreview
                key={board.id}
                onClick={this.goToBoard}
                {...board}
              />
            ))}

            <BoardPreview onClick={this.toggleModal} addBoard={true} />
          </div>
        </section>
        <section className="archived-boards-section">
          <div
            className="show-archive-board-btn"
            onClick={this.toggleShowArchivedBoardsModal}
          >
            Xem tất cả bảng đã ẩn
          </div>
          {showArchivedBoards && (
            <ArchivedBoardsModal
              handleToggle={this.toggleShowArchivedBoardsModal}
              handleRestoreBoard={this.handleRestoreBoard}
            />
          )}
        </section>
      </div>
    );
  }
}

export default connect(null, null)(Dashboard);
