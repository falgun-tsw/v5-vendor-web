import React, { Component } from "react";

export default class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  componentDidCatch(error, errorInfo) {
    this.setState({ hasError: true });
    console.warn("Error caught in error boundary ==>", error);
    console.warn("Error caught in error boundary info ==>", errorInfo);
  }

  render() {
    const { hasError } = this.state;
    const { children, fallBackUI } = this.props;
    if (hasError) {
      return fallBackUI ? (
        fallBackUI
      ) : (
        <h5>Something went wrong. Please try again after sometime</h5>
      );
    }
    return children;
  }
}
