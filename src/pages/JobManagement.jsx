import React from "react";
import JobManagementContainer from "@app/container/JobManagement/";
import ErrorBoundary from "@app/component/common/ErrorBoundary";

export default function JobManagement(props) {
  return (
    <ErrorBoundary>
      <JobManagementContainer {...props} />
    </ErrorBoundary>
  );
}
