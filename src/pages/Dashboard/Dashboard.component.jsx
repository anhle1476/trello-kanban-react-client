import "./Dashboard.style.scss";

import React, { Component } from "react";
import { connect } from "react-redux";
import axios from "axios";
import BoardPreview from "../../components/BoardPreview/BoardPreview.component";
import AddBoardModal from "../../components/AddBoardModal/AddBoardModal.component";

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
      const response = await axios.get("http://localhost:8080/api/v1/boards");
      this.setState({ boards: response.data });
    } catch (ex) {
      console.log(ex.response.data);
    }
  };

  toggleModal = ({ target }) => {
    if (!target.classList.contains("modal-toggle")) return;
    this.setState({ showModal: !this.state.showModal });
  };

  goToBoard = (e, id) => {
    this.props.history.push(`/boards/${id}`);
  };

  handleAddBoard = async (addForm) => {
    try {
      const response = await axios.post(
        "http://localhost:8080/api/v1/boards",
        addForm
      );
      this.setState({
        boards: [...this.state.boards, response.data],
        showModal: false,
      });
    } catch (ex) {
      console.log(ex.response.data);
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
            <i className="far fa-clock"></i> Cập nhật gần đây nhất
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
