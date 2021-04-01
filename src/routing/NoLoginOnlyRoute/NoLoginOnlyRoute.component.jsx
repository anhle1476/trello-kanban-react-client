import React from "react";
import { Route, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";

const NoLoginOnlyRoute = ({
  component: Component,
  security,
  ...otherProps
}) => (
  <Route
    {...otherProps}
    render={(props) =>
      !security?.user?.userId ? (
        <Component {...props} />
      ) : (
        <Redirect to="/dashboard" />
      )
    }
  />
);

NoLoginOnlyRoute.propTypes = {
  security: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  security: state.security,
});

export default connect(mapStateToProps)(NoLoginOnlyRoute);
