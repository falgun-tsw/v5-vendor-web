import React from "react";
import LoginContainer from "@app/container/Login/";
import ErrorBoundary from "@app/component/common/ErrorBoundary";

function Login(props) {
  return (
    <ErrorBoundary>
      <LoginContainer {...props} />
    </ErrorBoundary>
  );
}

export default Login;
