import React from "react";
import ErrorBoundary from "@app/component/common/ErrorBoundary";
import DashboardContainer from "@app/container/Dashboard/";

export default function Dashboard(props) {
  return (
    <ErrorBoundary>
      <DashboardContainer {...props} />
    </ErrorBoundary>
  );
}
