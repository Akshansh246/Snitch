import { createRoot } from 'react-dom/client'
import App from './app/App'
import { Provider } from 'react-redux'
import { store } from './app/app.store'
import ErrorBoundary from './features/shared/components/ErrorBoundary'

createRoot(document.getElementById('root')).render(
    <Provider store={store}>
        <ErrorBoundary>
            <App />
        </ErrorBoundary>
    </Provider>
)
