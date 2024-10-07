import React from "react";
import MyWorkContainer from "@app/container/MyWork/";
import ErrorBoundary from "@app/component/common/ErrorBoundary";

export default function MyWork(props) {
  return (
    <ErrorBoundary>
      <MyWorkContainer {...props} />
    </ErrorBoundary>
  );
}
