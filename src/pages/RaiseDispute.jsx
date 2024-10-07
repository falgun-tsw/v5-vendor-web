import React from "react";
import ErrorBoundary from "@app/component/common/ErrorBoundary";
import RaiseDisputeContainer from '@app/container/RaiseDispute';

export default function RaiseDispute(props) {
  return (
    <ErrorBoundary>
      <RaiseDisputeContainer {...props} />
    </ErrorBoundary>
  );
}
