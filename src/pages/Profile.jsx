import React from "react";
import ErrorBoundary from "@app/component/common/ErrorBoundary";
import ProfileContainer from "@app/container/Profile/";

export default function Profile(props) {
  return (
    <ErrorBoundary>
      <ProfileContainer {...props} />
    </ErrorBoundary>
  );
}
