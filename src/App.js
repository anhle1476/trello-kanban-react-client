import "./App.scss";
import { Route, Switch } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";

import Header from "./components/Header/Header.component";
import Login from "./pages/Login/Login.component";
import Register from "./pages/Register/Register.component";
import Dashboard from "./pages/Dashboard/Dashboard.component";
import Loader from "./components/loader/Loader.component";

const App = ({ isReady }) => (
  <div className="App">
    {isReady ? (
      <>
        <Header />
        <Switch>
          <Route exact path="/login" component={Login} />
          <Route exact path="/register" component={Register} />
          <Route exact path="/dashboard" component={Dashboard} />
        </Switch>
      </>
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
