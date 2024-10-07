import React from "react";
import EarningsContainer from "@app/container/Earnings/";
import ErrorBoundary from "@app/component/common/ErrorBoundary";

export default function Earnings(props) {
  return (
    <ErrorBoundary>
      <EarningsContainer {...props} />
    </ErrorBoundary>
  );
}
