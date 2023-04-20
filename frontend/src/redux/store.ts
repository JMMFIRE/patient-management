import {configureStore, PreloadedState} from '@reduxjs/toolkit'
import api from '../api/api'
import rootReducer from './reducer'

/**
 * Store setup util used for testing. Allows tester to pass in preloaded state to the store.
 * @param preloadedState State to be preloaded in the store.
 */
export const setupStore = (preloadedState: PreloadedState<object> = {}) => {
    return configureStore({
        reducer: rootReducer,
        preloadedState,
        middleware: getDefaultMiddleware =>
            getDefaultMiddleware({
                immutableCheck: false,
                serializableCheck: false,
            }).concat(api.middleware),
    })
}

// Infer the `RootState` type from the store itself
export type RootState = ReturnType<typeof rootReducer>
// export type AppStore = ReturnType<typeof setupStore>

