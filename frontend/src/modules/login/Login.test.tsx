import React from 'react'
import '@testing-library/jest-dom'
import {renderWithProviders} from '../../common/test/test-utils'
import LoginPage from './LoginPage'
import {fireEvent, screen, waitFor} from '@testing-library/react'


describe('Login Page', () => {

    it('Renders the login page, matching snapshot', async () => {
        const loginPage = renderWithProviders(<LoginPage/>)
        expect(loginPage).toMatchSnapshot()
    })

    it('Renders the login page', async() => {
        renderWithProviders(<LoginPage/>)
        const loginForm = await screen.findByTestId('login-form')
        expect(loginForm).toBeInTheDocument()
    })

    it('Successfully logs in a user', async () => {
        const { store } = renderWithProviders(<LoginPage/>)

        const email = await screen.findByTestId('login-email-field')
        const password = await screen.findByTestId('login-password-field')
        const loginButton = await screen.findByTestId('login-button')

        fireEvent.change(email, { target: { value: 'massottoj@envisionpharma.com'}})
        fireEvent.change(password, { target: { value: 'test'}})
        fireEvent.click(loginButton)

        await waitFor(() => expect(store.getState().authentication.isAuthenticated).toBe(true))
    })

    it('Unsuccessfully logs in a user', async () => {
        renderWithProviders(<LoginPage/>)

        const email = await screen.findByTestId('login-email-field')
        const password = await screen.findByTestId('login-password-field')
        const loginButton = await screen.findByTestId('login-button')

        fireEvent.change(email, { target: { value: 'massottoj@envisionpharma.com'}})
        fireEvent.change(password, { target: { value: 'a wrong password'}})
        fireEvent.click(loginButton)

        const invalidLogin = await screen.findByTestId('invalid-login')
        expect(invalidLogin).toBeInTheDocument()
    })
})
