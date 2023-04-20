import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import App from './modules/app/App'
import reportWebVitals from './reportWebVitals'
import {BrowserRouter} from 'react-router-dom'
import {Provider} from 'react-redux'
import {setupStore} from './redux/store'

// Get root element before we try and render the application. We'll do a null check later so we don't accidentally pass
// a root == null
const rootElement = document.getElementById('patient-management-root')

const store = setupStore()

if (rootElement) {
    const root = ReactDOM.createRoot(rootElement)
    root.render(
        <React.StrictMode>
            <BrowserRouter>
                <Provider store={store}>
                    <App/>
                </Provider>
            </BrowserRouter>
        </React.StrictMode>
    )
}

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()
