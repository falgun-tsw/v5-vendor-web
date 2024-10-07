import React from "react";
import AskUsContainer from "@app/container/AskUs/";
import ErrorBoundary from "@app/component/common/ErrorBoundary";

export default function AskUs(props) {
  return (
    <ErrorBoundary>
      <AskUsContainer {...props} />
    </ErrorBoundary>
  );
}
