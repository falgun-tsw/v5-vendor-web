import React from "react";
import ErrorBoundary from "@app/component/common/ErrorBoundary";
import AppliedJobsContainer from "@app/container/AppliedJobs/";

export default function AppliedJobs(props) {
  return (
    <ErrorBoundary>
      <AppliedJobsContainer {...props} />
    </ErrorBoundary>
  );
}
