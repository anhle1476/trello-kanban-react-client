import "./Dashboard.style.scss";

import React, { Component } from "react";
import { connect } from "react-redux";
import BoardPreview from "../../components/BoardPreview/BoardPreview.component";
import AddBoardModal from "../../components/AddBoardModal/AddBoardModal.component";
import { getAllBoardsInfo, createBoard } from "../../services/requestService";

class Dashboard extends Component {
  constructor(props) {
    super(props);

    this.state = {
      boards: [],
      showModal: false,
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

  render() {
    const { boards, showModal } = this.state;
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
      </div>
    );
  }
}

export default connect(null, null)(Dashboard);
