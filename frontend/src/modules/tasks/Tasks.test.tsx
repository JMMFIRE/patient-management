import '@testing-library/jest-dom'
import {loggedInPreloadedState, renderWithProviders} from '../../common/test/test-utils'
import TasksPage from './TasksPage'
import React from 'react'
import {fireEvent, screen, waitFor, waitForElementToBeRemoved} from '@testing-library/react'
import {server} from '../../mock/api/server'
import {resetTaskList} from '../../mock/api/handlers/tasks-api-handler'


beforeEach(() => {
    resetTaskList()
})

describe('Tasks Page', () => {

    it('Renders the tasks page, matching snapshot', async () => {
        const tasksPage = renderWithProviders(<TasksPage/>, loggedInPreloadedState)
        await waitForElementToBeRemoved(() => screen.getByText('Loading'))
        expect(tasksPage).toMatchSnapshot()

    })
    it('Renders the task page', async () => {
        renderWithProviders(<TasksPage/>, loggedInPreloadedState)
        const taskList = await screen.findByTestId('task-list')
        expect(taskList).toBeInTheDocument()
    })

    it('Populates the TaskActionbar count correctly', async () => {
        renderWithProviders(<TasksPage/>, loggedInPreloadedState)
        const actionBarTaskCount = await screen.findByTestId('task-count')
        expect(actionBarTaskCount.textContent).toEqual('2')
    })

    it('Opens a task from the task list as current task', async () =>  {
        renderWithProviders(<TasksPage/>, loggedInPreloadedState)
        const openButton = await screen.findAllByTestId('open-button')
        fireEvent.click(openButton[0])
        const saveCurrentTaskButton = await screen.findByTestId('save-current-task-button')
        expect(saveCurrentTaskButton).toBeInTheDocument()
    })

    it('Opens a new task as a current task', async () => {
        renderWithProviders(<TasksPage/>, loggedInPreloadedState)
        const newTaskButton = await screen.findByTestId('new-task-button')
        fireEvent.click(newTaskButton)
        const editTaskForm = await screen.findByTestId('edit-task-form')

        expect(editTaskForm).toBeInTheDocument()
    })

    it('Posts a new task', async () => {
        renderWithProviders(<TasksPage/>, loggedInPreloadedState)
        const newTaskButton = await screen.findByTestId('new-task-button')
        fireEvent.click(newTaskButton)

        const editTitleField = await screen.findByTestId('edit-title-field')
        const editDescriptionField = await screen.findByTestId('edit-description-field')
        const editTagsField = await screen.findByTestId('edit-tags-field')
        const saveCurrentTaskButton = await screen.findByTestId('save-current-task-button')
        const editDateField = await screen.getByPlaceholderText('Date')
        const closeButton = await screen.getByTestId('close-button')

        fireEvent.change(editTitleField, { target: { value: 'New task title'}})
        fireEvent.change(editDescriptionField, { target: { value: 'New description'}})
        fireEvent.change(editDateField, { target: { value: '04/20/2023'}})
        fireEvent.change(editTagsField, { target: { value: 'New test tags'}})
        fireEvent.click(saveCurrentTaskButton)
        fireEvent.click(closeButton)

        await waitFor(() => {
            const newTaskTitle = screen.getByText('New task title')
            expect(newTaskTitle).toBeInTheDocument()
        })
    })

    it('Deletes a task', async () => {
        renderWithProviders(<TasksPage/>, loggedInPreloadedState)

        const openButton = await screen.findAllByTestId('open-button')
        fireEvent.click(openButton[0])
        const deleteButton = await screen.findByTestId('delete-current-task-button')
        fireEvent.click(deleteButton)

        const taskToBeDeleted = screen.queryByText('Test Task')

        await waitForElementToBeRemoved(taskToBeDeleted)
    })

    it('Updates a current Task', async () => {
        renderWithProviders(<TasksPage/>, loggedInPreloadedState)

        const openButton = await screen.findAllByTestId('open-button')
        fireEvent.click(openButton[0])
        const editButton = await screen.findByTestId('edit-current-task-button')
        fireEvent.click(editButton)

        const editTitleField = await screen.findByTestId('edit-title-field')
        const editDescriptionField = await screen.findByTestId('edit-description-field')
        const editTagsField = await screen.findByTestId('edit-tags-field')
        const saveCurrentTaskButton = await screen.findByTestId('save-current-task-button')
        const editDateField = await screen.getByPlaceholderText('Date')
        const closeButton = await screen.getByTestId('close-button')

        fireEvent.change(editTitleField, { target: { value: 'Edited title'}})
        fireEvent.change(editDescriptionField, { target: { value: 'Edited description'}})
        fireEvent.change(editDateField, { target: { value: '04/21/2023'}})
        fireEvent.change(editTagsField, { target: { value: 'Edited tags'}})
        fireEvent.click(saveCurrentTaskButton)

        fireEvent.click(closeButton)

        await waitFor(() => {
            const newTaskTitle = screen.getByText('Edited title')
            expect(newTaskTitle).toBeInTheDocument()
        })
    })

    it('Sets a task completed status to true', async() => {
        renderWithProviders(<TasksPage/>, loggedInPreloadedState)

        const completedCheckboxes = await screen.findAllByTestId('completed-checkbox')
        const checkbox = completedCheckboxes[0] as HTMLInputElement

        fireEvent.click(checkbox)

        expect(checkbox.checked).toEqual(true)
    })
})
