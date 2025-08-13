import { Component, type ErrorInfo, type ReactNode } from "react";

interface Props<T = unknown> {
  children: ReactNode;
  fallBackComponent: ReactNode;
  resetCondition?: T;
  error?: boolean;
}

interface State<T = unknown> {
  hasError: boolean;
  resetCondition?: T;
}

class ErrorBoundary<T = unknown> extends Component<Props, State> {
  constructor(props: Props<T>) {
    super(props);
    this.state = { hasError: false, resetCondition: props.resetCondition };
  }

  static getDerivedStateFromError(): Partial<State> {
    return { hasError: true };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.log("Error", error);
    console.log("Error Info", errorInfo);
  }

  componentDidUpdate(prevProps: Props<T>) {
    if (prevProps.resetCondition !== this.props.resetCondition) {
      this.setState({
        hasError: false,
        resetCondition: this.props.resetCondition,
      });
    }
  }

  render() {
    if (this.state.hasError || this.props.error)
      return this.props.fallBackComponent;

    return this.props.children;
  }
}

export default ErrorBoundary;
