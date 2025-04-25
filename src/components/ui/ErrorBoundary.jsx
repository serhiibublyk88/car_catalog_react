import { Component } from "react";
import { toast } from "react-toastify";

export class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    toast.error("Ein unerwarteter Fehler ist aufgetreten.");
    console.error("Caught by ErrorBoundary:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div style={{ padding: "2rem", textAlign: "center" }}>
          <h2>Etwas ist schiefgelaufen.</h2>
          <p>
            Bitte laden Sie die Seite neu oder kontaktieren Sie den Support.
          </p>
        </div>
      );
    }

    return this.props.children;
  }
}
