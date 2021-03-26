import "./Dashboard.style.scss";

import React, { Component } from "react";
import { connect } from "react-redux";
import axios from "axios";

class Dashboard extends Component {
  constructor(props) {
    super(props);

    this.state = {
      boards: [],
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

  render() {
    return (
      <div className="container">
        {this.state.boards.map((board) => (
          <div key={board.id} className="board">
            <h2>{board.title}</h2>
          </div>
        ))}
      </div>
    );
  }
}

export default connect(null, null)(Dashboard);
