import React from "react";
import AddVendorUserContainer from "@app/container/AddVendorUser";
import ErrorBoundary from "@app/component/common/ErrorBoundary";

export default function AddVendorUser(props) {
  return (
    <ErrorBoundary>
      <AddVendorUserContainer {...props} />
    </ErrorBoundary>
  );
}
