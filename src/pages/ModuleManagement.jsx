import React from "react";
import ErrorBoundary from "@app/component/common/ErrorBoundary";
import ModuleManagementContainer from "@app/container/ModuleManagement/ModuleManagementContainer";

const ModuleManagement = (props) => {
  return (
    <ErrorBoundary>
      <ModuleManagementContainer {...props} />
    </ErrorBoundary>
  );
};

export default ModuleManagement;
