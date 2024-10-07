import React from "react";
import JobDetailsContainer from "@app/container/JobDetails";
import ErrorBoundary from "@app/component/common/ErrorBoundary";

export default function JobDetails(props) {
  return (
    <ErrorBoundary>
      <JobDetailsContainer {...props} />
    </ErrorBoundary>
  );
}
