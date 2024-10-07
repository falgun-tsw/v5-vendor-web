import React from "react";
import ViewVendorUserContainer from "@app/container/ViewVendorUser";
import ErrorBoundary from "@app/component/common/ErrorBoundary";

export default function UserView(props) {
  return (
    <ErrorBoundary>
      <ViewVendorUserContainer {...props} />
    </ErrorBoundary>
  );
}
