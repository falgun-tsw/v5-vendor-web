import React from "react";
import ErrorBoundary from "@app/component/common/ErrorBoundary";
import FaqsContainer from "@app/container/Faqs/";

export default function Faqs(props) {
  return (
    <ErrorBoundary>
      <FaqsContainer {...props} />
    </ErrorBoundary>
  );
}
