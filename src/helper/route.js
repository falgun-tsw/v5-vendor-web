import React from "react";
import { Route, Redirect } from "react-router-dom";

// to handle redirection from public route
// Ex.
// An authenticated user tries to load public pages like Login, Register, etc.
// it will redirect to defined path
export const PublicRoute = (props) => {
  const { redirectTo = "/", auth, ...restProps } = props;

  if (auth.isAuthenticated) {
    return <Redirect to={redirectTo} />;
  }

  return <Route {...restProps} />;
};

// to handle redirection from private/restricted route
// Ex.
// A non authenticated user tries to load restricted pages like Profile, Dashboard, etc.
// it will redirect to defined path
export const PrivateRoute = (props) => {
  const { redirectTo = "/", auth, ...restProps } = props;
  if (!auth.isAuthenticated) {
    return <Redirect to={redirectTo} />;
  }

  return <Route {...restProps} />;
};
