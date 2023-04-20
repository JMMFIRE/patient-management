import '@testing-library/jest-dom'
import {renderWithProviders} from '../../common/test/test-utils'
import React from 'react'
import {fireEvent, screen, waitFor} from '@testing-library/react'
import App from './App'
import {useLocation} from 'react-router-dom'

const loggedInPreloadedState = {
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

describe('Application', () => {

    it('Renders the application, matching snapshot', () => {
        const mockDate = new Date(2022, 2, 30)
        jest.spyOn(global, 'Date').mockImplementation(() => mockDate)

        const app = renderWithProviders(<App/>, loggedInPreloadedState)
        expect(app).toMatchSnapshot()
    })

    it('Renders the application', async () => {
        renderWithProviders(<App/>, loggedInPreloadedState)
        const topbar = await screen.findByTestId('topbar')

        expect(topbar).toBeInTheDocument()
    })

    it('Logs out of the application', async () => {
        const { store } = renderWithProviders(<App/>, loggedInPreloadedState)

        const logout = await screen.findByTestId('logout-button')
        fireEvent.click(logout)

        await waitFor(() => expect(store.getState().authentication.isAuthenticated).toBe(false))
    })

    it('Navigates to the correct page using the sidebar', async () => {
        const app = renderWithProviders(<App/>, loggedInPreloadedState)

        const dashboardButton = await screen.findByTestId('dashboard-button')
        const scheduleButton = await screen.findByTestId('schedule-button')
        const tasksButton = await screen.findByTestId('tasks-button')
        const patientsButton = await screen.findByTestId('patients-button')
        const messagesButton = await screen.findByTestId('messages-button')
        const analyticsButton = await screen.findByTestId('analytics-button')
        const settingsButton = await screen.findByTestId('settings-button')
        const supportButton = await screen.findByTestId('support-button')

        fireEvent.click(dashboardButton)
        await waitFor(() => expect(app.mockedNavigate).toBeCalled())
        expect(app.mockedNavigate.mock.lastCall[0]).toBe('/dashboard')
        fireEvent.click(patientsButton)
        await waitFor(() => expect(app.mockedNavigate).toBeCalled())
        expect(app.mockedNavigate.mock.lastCall[0]).toBe('/patients')
        fireEvent.click(scheduleButton)
        await waitFor(() => expect(app.mockedNavigate).toBeCalled())
        expect(app.mockedNavigate.mock.lastCall[0]).toBe('/schedule')
        fireEvent.click(tasksButton)
        await waitFor(() => expect(app.mockedNavigate).toBeCalled())
        expect(app.mockedNavigate.mock.lastCall[0]).toBe('/tasks')
        fireEvent.click(messagesButton)
        await waitFor(() => expect(app.mockedNavigate).toBeCalled())
        expect(app.mockedNavigate.mock.lastCall[0]).toBe('/messages')
        fireEvent.click(analyticsButton)
        await waitFor(() => expect(app.mockedNavigate).toBeCalled())
        expect(app.mockedNavigate.mock.lastCall[0]).toBe('/analytics')
        fireEvent.click(settingsButton)
        await waitFor(() => expect(app.mockedNavigate).toBeCalled())
        expect(app.mockedNavigate.mock.lastCall[0]).toBe('/settings')
        fireEvent.click(supportButton)
        await waitFor(() => expect(app.mockedNavigate).toBeCalled())
        expect(app.mockedNavigate.mock.lastCall[0]).toBe('/support')
    })
})
