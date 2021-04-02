import React, { Component } from "react";
import ModalWrapper from "../ModalWrapper/ModalWrapper.component";
import CustomButton from "../CustomButton/CustomButton.component";
import Loader from "../Loader/Loader.component";

import {
  getArchivedBoardsInfo,
  deleteBoard,
} from "../../services/requestService";
import { deleteBoardConfirm } from "../../services/boardEditingService";
import "./ArchivedBoardsModal.style.scss";

class ArchivedBoardsModal extends Component {
  constructor(props) {
    super(props);

    this.state = {
      archivedBoards: [],
      search: "",
      fetching: true,
    };
  }

  componentDidMount() {
    this.fetchData();
  }

  fetchData = async () => {
    try {
      const response = await getArchivedBoardsInfo();
      this.setState({
        ...this.state,
        archivedBoards: response.data,
        fetching: false,
      });
    } catch (ex) {
      console.log(ex);
      this.setState({ fetch: false });
    }
  };

  handleSearch = ({ target }) => {
    this.setState({ search: target.value });
  };

  handleFilterAndRestoreBoard = (board) => {
    this.props.handleRestoreBoard(board);
    this.doFilterBoard(board);
  };

  handleDeleteBoard = (board) => {
    deleteBoardConfirm(async () => {
      try {
        this.doFilterBoard(board);
        await deleteBoard(board.id);
      } catch (ex) {
        console.log(ex);
      }
    });
  };

  doFilterBoard = (board) => {
    this.setState({
      archivedBoards: this.state.archivedBoards.filter(
        (archived) => archived.id !== board.id
      ),
    });
  };

  render() {
    const { handleToggle } = this.props;
    const { archivedBoards, search, fetching } = this.state;
    const searchKeyword = search.toLowerCase();
    const total = archivedBoards.length;
    const filtered = archivedBoards.filter(
      (board) => board.title.toLowerCase().indexOf(searchKeyword) !== -1
    );
    return (
      <ModalWrapper handleToggle={handleToggle}>
        <div className="archived-boards-modal">
          <div className="modal-header">
            <h3 className="modal-title">
              <i className="fas fa-archive"></i> Bảng đã ẩn
            </h3>
            <span className="modal-close-btn" onClick={handleToggle}>
              &#10005;
            </span>
          </div>
          <div className="modal-search">
            <input
              type="search"
              className="archived-boards-search input-control"
              value={search}
              placeholder="Tìm kiếm..."
              onChange={this.handleSearch}
              disabled={!total}
            />
          </div>
          {fetching ? (
            <Loader />
          ) : (
            <div className="modal-board-container">
              {!total && (
                <p className="text-center mt-1">Không có bảng nào bị ẩn</p>
              )}
              {filtered.map((board) => (
                <div key={board.id} className="archived-board">
                  <p>{board.title}</p>
                  <div>
                    <CustomButton
                      customClass="btn-gray btn-small text-primary-dark"
                      handleClick={() => this.handleDeleteBoard(board)}
                    >
                      &#10005; <span> Xóa</span>
                    </CustomButton>
                    <CustomButton
                      customClass="btn-success btn-small"
                      handleClick={() =>
                        this.handleFilterAndRestoreBoard(board)
                      }
                    >
                      <i className="fas fa-undo"></i> <span> Khôi phục</span>
                    </CustomButton>
                  </div>
                </div>
              ))}
              {searchKeyword !== "" && total && (
                <p className="mt-1">{`${filtered.length}/${total} Bảng`}</p>
              )}
            </div>
          )}
        </div>
      </ModalWrapper>
    );
  }
}

export default ArchivedBoardsModal;
