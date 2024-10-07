import React from "react";
import EditVendorUserContainer from "@app/container/EditVendorUser";
import ErrorBoundary from "@app/component/common/ErrorBoundary";

export default function EditVendorUser(props) {
  return (
    <ErrorBoundary>
      <EditVendorUserContainer {...props} />
    </ErrorBoundary>
  );
}
