import React, { Component } from 'react';
import { toast } from 'react-toastify';

class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error('Unhandled React Error:', error, errorInfo);
    toast.error('An unexpected error occurred in the Atelier interface.', {
      position: 'top-right',
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
    });
  }

  handleReload = () => {
    this.setState({ hasError: false, error: null });
    window.location.reload();
  };

  render() {
    if (this.state.hasError) {
      return (
        <div className="w-full min-h-screen bg-snitch-bg text-snitch-text flex flex-col items-center justify-center p-6 text-center">
          <div className="max-w-md bg-snitch-surface p-8 rounded-2xl border border-snitch-border shadow-xl flex flex-col items-center gap-5">
            <div className="w-12 h-12 rounded-full bg-snitch-danger/10 text-snitch-danger flex items-center justify-center font-bold text-xl">
              !
            </div>
            <h2 className="text-2xl font-snitch-display text-snitch-text font-semibold">
              Something went wrong
            </h2>
            <p className="text-xs text-snitch-text-muted leading-relaxed">
              We encountered an unhandled exception while rendering this page.
              A notification has been logged.
            </p>
            <button
              onClick={this.handleReload}
              className="btn px-6 py-3 text-xs font-semibold mt-2"
            >
              Reload Atelier
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
