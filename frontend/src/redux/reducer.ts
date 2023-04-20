import AuthenticationSlice from '../features/authentication/AuthenticationSlice'
import api from '../api/api'
import {combineReducers} from '@reduxjs/toolkit'

const rootReducer = combineReducers({
    authentication: AuthenticationSlice,
    [api.reducerPath]: api.reducer,
})

export default rootReducer
