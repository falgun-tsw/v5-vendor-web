import React from "react";
import ReportContainer from "@app/container/Reports";
import ErrorBoundary from "@app/component/common/ErrorBoundary";

export default function Reports(props) {
  return (
    <ErrorBoundary>
      <ReportContainer {...props} />
    </ErrorBoundary>
  );
}
