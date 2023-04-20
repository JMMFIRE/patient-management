import '@testing-library/jest-dom'
import {resetPatientList} from '../../mock/api/handlers/patients-api-handler'
import {loggedInPreloadedState, renderWithProviders} from '../../common/test/test-utils'
import PatientRegisterPage from './PatientRegisterPage'
import React from 'react'
import {fireEvent, screen, waitFor, waitForElementToBeRemoved} from '@testing-library/react'


beforeEach(() => {
    resetPatientList()
})

describe('Patients Register Page', () => {

    it('Renders the patient register page, matches snapshot', () => {
        const patientRegisterPage = renderWithProviders(<PatientRegisterPage/>, loggedInPreloadedState)
        expect(patientRegisterPage).toMatchSnapshot()
    })

    it('Renders the patient register page', async () => {
        renderWithProviders(<PatientRegisterPage/>, loggedInPreloadedState)
        const patientTable = await screen.findByTestId('patient-table')
        expect(patientTable).toBeInTheDocument()
    })

    it('Populates the patient register table', async () => {
        renderWithProviders(<PatientRegisterPage/>, loggedInPreloadedState)

        const patient1 = await screen.findByText('Test Patient1')
        const patient2 = await screen.findByText('Test Patient2')
        const patient3 = await screen.findByText('Test Patient3')

        expect(patient1).toBeInTheDocument()
        expect(patient2).toBeInTheDocument()
        expect(patient3).toBeInTheDocument()
    })

    it('Generates the correct style for the "Status" column', async () => {
        renderWithProviders(<PatientRegisterPage/>, loggedInPreloadedState)

        const awaitingSurgery = await screen.findByText('Awaiting Surgery')
        const recovered = await screen.findByText('Recovered')
        const onTreatment = await screen.findByText('On Treatment')

        expect(awaitingSurgery).toHaveClass('awaitingSurgery')
        expect(recovered).toHaveClass('recovered')
        expect(onTreatment).toHaveClass('onTreatment')
    })

    it('Navigates to the add patient page', async () => {
        const patientRegisterPage = renderWithProviders(<PatientRegisterPage/>, loggedInPreloadedState)
        const addPatient = await screen.findByTestId('add-patient-button')

        fireEvent.click(addPatient)

        await waitFor(() => expect(patientRegisterPage.mockedNavigate).toBeCalled())
        expect(patientRegisterPage.mockedNavigate.mock.lastCall[0]).toBe('add-patient')
    })

    it('Deletes a patient from the patients list', async () => {
        renderWithProviders(<PatientRegisterPage/>, loggedInPreloadedState)

        const toggleOptions = await screen.findAllByTestId('toggle-options')
        fireEvent.click(toggleOptions[0])
        const deletePatient = await screen.findByTestId('delete-patient-button')
        fireEvent.click(deletePatient)

        const patientToBeDeleted = screen.queryByText('Test Patient1')
        await waitForElementToBeRemoved(patientToBeDeleted)
    })
})
