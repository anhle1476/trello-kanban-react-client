import { Route, Switch } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";

import Header from "./components/Header/Header.component";
import Login from "./pages/Login/Login.component";
import Register from "./pages/Register/Register.component";
import Dashboard from "./pages/Dashboard/Dashboard.component";
import Loader from "./components/Loader/Loader.component";
import KanbanBoard from "./pages/KanbanBoard/KanbanBoard.component";
import ErrorPage from "./pages/ErrorPage/ErrorPage.component";

import MustLoginRoute from "./routing/MustLoginRoute/MustLoginRoute.component";
import NoLoginOnlyRoute from "./routing/NoLoginOnlyRoute/NoLoginOnlyRoute.component";

import "css-reset/reset.css";
import "./App.scss";

const App = ({ isReady }) => (
  <div className="App">
    <Header />
    {isReady ? (
      <Switch>
        <NoLoginOnlyRoute exact path="/login" component={Login} />
        <NoLoginOnlyRoute exact path="/register" component={Register} />
        <MustLoginRoute exact path="/dashboard" component={Dashboard} />
        <MustLoginRoute exact path="/boards/:boardId" component={KanbanBoard} />
        <Route path="/" component={ErrorPage} />
      </Switch>
    ) : (
      <Loader></Loader>
    )}
  </div>
);

App.propTypes = {
  isReady: PropTypes.bool.isRequired,
};

const mapStateToProps = (state) => ({
  isReady: state.global.ready,
});

export default connect(mapStateToProps)(App);
