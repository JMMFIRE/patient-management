import styles from './CurrentTaskActionBar.module.scss'
import {Actionbar} from '../../../../common/components'
import {ArrowClockwise, CaretLeftFill, Check2, PencilSquare, Trash3} from 'react-bootstrap-icons'
import {Button} from 'react-bootstrap'
import {useDeleteTaskMutation, usePostTaskMutation, usePutTaskMutation} from '../../../../features/tasks/TasksApiSlice'
import React from 'react'

type CurrentTaskActionBarProps = {
    task: Task,
    onCloseCurrentTask: () => void,
    onSetIsEditing: (isEditing: boolean) => void
}

const CurrentTaskActionBar: React.FC<CurrentTaskActionBarProps> = ({ task, onCloseCurrentTask, onSetIsEditing }) => {

    const [deleteTask] = useDeleteTaskMutation()
    const [postTask] = usePostTaskMutation()
    const [putTask] = usePutTaskMutation()


    /**
     * Deletes the task with the given taskNumber and closes the current task view.
     *
     * @param currentTaskNumber taskNumber property of task to be deleted.
     */
    const deleteCurrentTask = (currentTaskNumber: number | undefined) => {
        deleteTask(currentTaskNumber)
        onCloseCurrentTask()
    }

    /**
     * Saves the current task. If the task is new and doesn't have a taskNumber property assigned, it will
     * send a POST request and create a new DB entry. If the task does have a taskNumber, a PUT is sent and it's entry
     * is edited.
     *
     * The isEditing property is set to false.
     *
     * @param currentTask task to be saved.
     */
    const saveCurrentTask = (currentTask: Task) => {

        if (currentTask.taskNumber)
            putTask(currentTask)
        else
            postTask(currentTask)

        onSetIsEditing(false)
    }

    return (
        <Actionbar header={
            <>
                <Button
                    className={styles.backButton}
                    variant={'light'}
                    onClick={onCloseCurrentTask}
                    data-testid="close-button"
                >
                    <CaretLeftFill/>
                </Button>
              Task
            </>
        }
        buttons={
            <>
                <Button
                    className={styles.checkButton}
                    variant={'light'}
                    onClick={() => saveCurrentTask(task)}
                    data-testid="save-current-task-button"
                >
                    <Check2/>
                </Button>
                <Button variant={'light'}>
                    <ArrowClockwise/>
                </Button>
                <Button
                    variant={'light'}
                    onClick={() => onSetIsEditing(true)}
                    data-testid="edit-current-task-button"

                >
                    <PencilSquare/>
                </Button>
                <Button
                    className={styles.deleteButton}
                    variant={'light'}
                    onClick={() => deleteCurrentTask(task.taskNumber)}
                    data-testid="delete-current-task-button"

                >
                    <Trash3/>
                </Button>
            </>
        }
        />
    )
}

export default CurrentTaskActionBar
