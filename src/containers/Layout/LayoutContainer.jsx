import React from "react";
import LayoutWeb from "./LayoutWeb";
class LayoutContainer extends React.Component {
  render() {
    return <LayoutWeb {...this.props} />;
  }
}

export default LayoutContainer;
