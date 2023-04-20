import {createSlice} from '@reduxjs/toolkit'

const SLICE_NAME = 'Authentication'

type User = {
    userId: number | null,
    firstName: string | null,
    lastName: string | null,
    role: string | null,
}

export type AuthenticationState = {
    isAuthenticated: boolean,
    currentUser: User
}

const initialState: AuthenticationState = {
    isAuthenticated: false,
    currentUser: {
        userId: null,
        firstName: null,
        lastName: null,
        role: null,
    },
}

const AuthenticationSlice = createSlice({
    name: SLICE_NAME,
    initialState,
    reducers: {
        /**
         * Authenticates the given user and sets isAuthenticated to 'true'.
         *
         * @param state the current state of the AuthenticationSlice
         * @param action an object consisting of an email and password attribute
         */
        loginUser: (state, action) => {
            state.currentUser.userId = action.payload.userId
            state.currentUser.firstName = action.payload.firstName
            state.currentUser.lastName = action.payload.lastName
            state.currentUser.role = action.payload.role
            state.isAuthenticated = true
        },
        /**
         * Logs out a user and sets isAuthenticated to 'false'
         *
         * @param state the current state of the AuthenticationSlice
         */
        logoutUser: (state) => {
            state.currentUser.userId = null
            state.currentUser.firstName = null
            state.currentUser.lastName = null
            state.currentUser.role = null
            state.isAuthenticated = false
        }
    }

})

export const {loginUser, logoutUser} = AuthenticationSlice.actions

export default AuthenticationSlice.reducer
