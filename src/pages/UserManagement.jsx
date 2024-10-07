import React from "react";
import UserManagementContainer from "@app/container/UserManagement";
import ErrorBoundary from "@app/component/common/ErrorBoundary";

export default function UserManagement(props) {
  return (
    <ErrorBoundary>
      <UserManagementContainer {...props} />
    </ErrorBoundary>
  );
}
