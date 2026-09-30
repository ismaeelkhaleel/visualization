import { Component } from 'react'
import type { ErrorInfo, ReactNode } from 'react'
interface Props {
  children?: ReactNode
  fallback?: ReactNode
}

interface State {
  hasError: boolean
  error: Error | null
}

class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
    error: null
  }

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error }
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Uncaught error:', error, errorInfo)
  }

  public render() {
    if (this.state.hasError) {
      if (this.props.fallback) return this.props.fallback
      return (
        <div style={{
          width: '100%', height: '100%', display: 'flex', flexDirection: 'column',
          alignItems: 'center', justifyContent: 'center', padding: '20px',
          background: 'rgba(239, 68, 68, 0.1)', border: '1px solid #ef4444',
          borderRadius: '8px', color: '#f87171', textAlign: 'center'
        }}>
          <h2 style={{ margin: '0 0 10px 0', fontSize: '16px' }}>Visualization Error</h2>
          <p style={{ margin: 0, fontSize: '12px', opacity: 0.8 }}>
            {this.state.error?.message || 'An unexpected error occurred.'}
          </p>
          <button
            onClick={() => this.setState({ hasError: false })}
            style={{
              marginTop: '15px', padding: '6px 12px', background: '#ef4444',
              color: '#fff', border: 'none', borderRadius: '4px', cursor: 'pointer',
              fontSize: '12px', fontWeight: 600
            }}
          >
            Try Again
          </button>
        </div>
      )
    }

    return this.props.children
  }
}

export default ErrorBoundary
