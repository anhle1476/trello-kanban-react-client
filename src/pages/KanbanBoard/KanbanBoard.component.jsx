import React, { Component } from "react";
import { connect } from "react-redux";
import { fetchCurrentBoard } from "../../reducers/boardReducer/boardAction";
import PropTypes from "prop-types";
import "./KanbanBoard.style.scss";
import Loader from "../../components/Loader/Loader.component";

class KanbanBoard extends Component {
  componentDidMount() {
    const { match, fetchCurrentBoard } = this.props;
    console.log(match);
    fetchCurrentBoard(match.params.boardId);
  }

  render() {
    const { boardInfo, cardColumns, isFetching } = this.props;
    if (isFetching) {
      return <Loader />;
    }
    return <div>Kanban</div>;
  }
}

KanbanBoard.propTypes = {
  fetchCurrentBoard: PropTypes.func.isRequired,
  boardInfo: PropTypes.object.isRequired,
  cardColumns: PropTypes.array.isRequired,
  isFetching: PropTypes.bool.isRequired,
};

const mapStateToProps = (state) => ({
  boardInfo: state.board.boardInfo,
  cardColumns: state.board.cardColumns,
  isFetching: state.board.isFetching,
});

export default connect(mapStateToProps, { fetchCurrentBoard })(KanbanBoard);
