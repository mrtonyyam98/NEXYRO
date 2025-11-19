import React from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'
import { store } from './app/store.js'
import { Provider } from 'react-redux'
import { ClerkProvider } from '@clerk/clerk-react'


// Import your Publishable Key
const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY || ''

if (!PUBLISHABLE_KEY) {
    console.error('Missing VITE_CLERK_PUBLISHABLE_KEY environment variable');
    // 在开发环境中显示错误
    if (import.meta.env.DEV) {
        throw new Error('Missing Publishable Key. Please set VITE_CLERK_PUBLISHABLE_KEY in your .env file');
    }
}

// 错误边界组件
const ErrorFallback = ({ error }) => (
    <div style={{ padding: '20px', textAlign: 'center' }}>
        <h1>Something went wrong</h1>
        <p>{error?.message || 'An unexpected error occurred'}</p>
        <p style={{ fontSize: '12px', color: '#666', marginTop: '20px' }}>
            {PUBLISHABLE_KEY ? 'Clerk key is set' : 'Clerk key is missing'}
        </p>
    </div>
);

// 错误边界包装器
class ErrorBoundary extends React.Component {
    constructor(props) {
        super(props);
        this.state = { hasError: false, error: null };
    }

    static getDerivedStateFromError(error) {
        return { hasError: true, error };
    }

    componentDidCatch(error, errorInfo) {
        console.error('Error caught by boundary:', error, errorInfo);
    }

    render() {
        if (this.state.hasError) {
            return <ErrorFallback error={this.state.error} />;
        }
        return this.props.children;
    }
}

// 只在有 key 时才渲染 ClerkProvider
const AppWithAuth = () => {
    if (!PUBLISHABLE_KEY) {
        return (
            <div style={{ padding: '20px', textAlign: 'center' }}>
                <h1>Configuration Error</h1>
                <p>VITE_CLERK_PUBLISHABLE_KEY is not set. Please configure it in Vercel environment variables.</p>
            </div>
        );
    }

    return (
        <ClerkProvider publishableKey={PUBLISHABLE_KEY}>
            <Provider store={store}>
                <App />
            </Provider>
        </ClerkProvider>
    );
};

createRoot(document.getElementById('root')).render(
    <ErrorBoundary>
        <BrowserRouter>
            <AppWithAuth />
        </BrowserRouter>
    </ErrorBoundary>,
)
