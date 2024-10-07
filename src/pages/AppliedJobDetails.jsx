import React from "react";
import ErrorBoundary from "@app/component/common/ErrorBoundary";
import AppliedJobsDetailsContainer from "@app/container/AppliedJobsDetails/";

export default function AppliedJobDetails(props) {
  return (
    <ErrorBoundary>
      <AppliedJobsDetailsContainer {...props} />
    </ErrorBoundary>
  );
}
