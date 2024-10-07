import React from "react";
import WorkDetailsContainer from "@app/container/WorkDetails/";
import ErrorBoundary from "@app/component/common/ErrorBoundary";

export default function WorkDetails(props) {
  return (
    <ErrorBoundary>
      <WorkDetailsContainer {...props} />
    </ErrorBoundary>
  );
}
