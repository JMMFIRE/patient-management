import React, {ReactElement} from 'react'
import { render } from '@testing-library/react'
import { Provider } from 'react-redux'
import { setupListeners } from '@reduxjs/toolkit/dist/query'
import {setupStore} from '../../redux/store'
import {BrowserRouter, Route, Routes} from 'react-router-dom'




export const loggedInPreloadedState = {
    preloadedState: {
        authentication: {
            isAuthenticated: true,
            currentUser: {
                userId: 1,
                firstName: 'Jacob',
                lastName: 'Massotto',
                role: 'General Doctor'
            }
        }
    }
}

/**
 * Utility function for rendering a React component with a Redux store as a Provider component
 *
 * @param ui React component to be rendered
 * @param preloadedState Optional object that contains the initial state of the Redux store
 * @param store Optional Redux store instance. If none is provided a new store will be
 * created with the provided preloadedState object
 * @param route
 * @param renderOptions Additional options to be passed to the 'render' function
 */
export function renderWithProviders(
    ui: ReactElement,
    // Optional options object
    {
        preloadedState= {},
        // Automatically create a store instance if no store was passed in
        store = setupStore(preloadedState),
        route = '*',
        ...renderOptions
    } = {}
) {
    // Sets up any event listeners that may be necessary for the Redux store
    setupListeners(store.dispatch)


    type WrapperProps = {
        children: ReactElement
    }

    const mockedNavigate = jest.fn()
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    jest.spyOn(require('react-router'), 'useNavigate').mockImplementation(() => mockedNavigate)

    function Wrapper({ children }: WrapperProps) {

        return (
            <BrowserRouter >
                <Provider store={store}>
                    <Routes>
                        <Route path={`${route}`} element={children} />
                    </Routes>
                </Provider>
            </BrowserRouter>
        )
    }


    const renderResult = render(ui, { wrapper: Wrapper, ...renderOptions })

    // Returns an object with two properties: the store and the result of calling render with the ui and renderOptions
    // wrapped in the Wrapper component
    return { store, renderResult, mockedNavigate}
}
