import '@testing-library/jest-dom'
import {resetPatientList} from '../../mock/api/handlers/patients-api-handler'
import {loggedInPreloadedState, renderWithProviders} from '../../common/test/test-utils'
import AddPatientPage from './AddPatientPage'
import React from 'react'
import {fireEvent, screen, waitFor} from '@testing-library/react'
import {response} from 'msw'


beforeEach(() => {
    resetPatientList()
})

describe('Add Patients Page', () => {

    it('Renders the add patient page', async () => {
        renderWithProviders(<AddPatientPage/>, loggedInPreloadedState)
        const addPatientForm = await screen.findByTestId('add-patient-form')
        expect(addPatientForm).toBeInTheDocument()
    })

    it('Renders the add patient page, matches snapshot', async () => {
        const addPatientPage = renderWithProviders(<AddPatientPage/>, loggedInPreloadedState)
        expect(addPatientPage).toMatchSnapshot()
    })

    it('Cancels the addition of a new patient', async () => {
        const addPatientPage = renderWithProviders(<AddPatientPage/>, loggedInPreloadedState)
        const cancelButton = await screen.findByTestId('cancel-button')

        fireEvent.click(cancelButton)

        await waitFor(() => expect(addPatientPage.mockedNavigate).toBeCalled())
        expect(addPatientPage.mockedNavigate.mock.lastCall[0]).toBe('/patients')
    })

    it('Adds a new patient', async () => {
        const addPatientPage = renderWithProviders(<AddPatientPage/>, loggedInPreloadedState)

        const firstName = await screen.findByTestId('first-name-field')
        const lastName = await screen.findByTestId('last-name-field')
        const dob = await screen.getByLabelText('Date of birth')
        const maleButton = await screen.findByTestId('male-button')
        const diagnosis = await screen.findByTestId('diagnosis-field')
        const notes = await screen.findByTestId('notes-field')
        const phoneNumber = await screen.findByTestId('phone-number-field')
        const saveButton = await screen.findByTestId('save-button')

        fireEvent.change(firstName, { target: { value: 'Test fName'}})
        fireEvent.change(lastName, { target: { value: 'Test lName'}})
        fireEvent.change(dob, { target: { value: '05/20/1997' }})
        fireEvent.click(maleButton)
        fireEvent.change(diagnosis, { target: { value: 'Test diagnosis'}})
        fireEvent.change(notes, { target: { value: 'Test notes'}})
        fireEvent.change(phoneNumber, { target: { value: 'Test phone number'}})
        fireEvent.click(saveButton)

        await waitFor(() => expect(addPatientPage.mockedNavigate).toBeCalled())
        expect(addPatientPage.mockedNavigate.mock.lastCall[0]).toBe('/patients')

        const { status } = await response.once()

        expect(status).toBe(200)
    })
})
