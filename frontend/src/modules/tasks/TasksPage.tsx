import styles from './TasksPage.module.scss'
import TaskList from './TaskList/TaskList'
import CurrentTask from './CurrentTask/CurrentTask'
import {useState} from 'react'
import {useSelector} from 'react-redux'
import {useGetTasksQuery} from '../../features/tasks/TasksApiSlice'
import React from 'react'
import {RootState} from '../../redux/store'

const TasksPage = () => {


    const {currentUser}  = useSelector((state: RootState) => state.authentication)

    const {data: taskData, isLoading} = useGetTasksQuery(currentUser.userId)

    const [currentTask, setCurrentTask] = useState<Task | null>(null)
    const [isEditing, setIsEditing] = useState(false)

    /**
     * Sets the current task's title
     *
     * @param newTitle The new title
     */
    const setCurrentTaskTitle = (newTitle: string) => {
        setCurrentTask({...currentTask, title: newTitle} as Task)
    }

    /**
     * Sets the current task's description
     *
     * @param newDescription The new description
     */
    const setCurrentTaskDescription = (newDescription: string)  => {
        setCurrentTask({...currentTask, description: newDescription} as Task)
    }

    /**
     * Sets the current task's due date
     *
     * @param newDueDate The new due date
     */
    const setCurrentTaskDueDate = (newDueDate: Date | null)  => {
        setCurrentTask({...currentTask, dueDate: newDueDate} as Task)
    }

    /**
     * Sets the current task's tags as an array delimited by a space (" ")
     *
     * @param newTags The new tags a single String
     */
    const setCurrentTaskTags = (newTags: string)  => {
        const tags = newTags.split(' ')
        const updatedTags = tags.map(tag => tag)
        setCurrentTask({...currentTask, tags: updatedTags} as Task)
    }

    /**
     * Closes the current task view and sets current task to null
     */
    const closeCurrentTask = () => {
        setCurrentTask(null)
        setIsEditing(false)
    }

    /**
     *  Sets the current task and opens the current task view
     *
     * @param taskIndex The index of the current task to be opened
     */
    const openCurrentTask = (taskIndex: number) => {
        setCurrentTask(taskData[taskIndex])
    }

    /**
     * Opens a new blank task and sets the current task to it.
     */
    const openNewTask = () => {
        const newTaskInitialState: Task = {
            title: 'New Task',
            description: '',
            completed: false,
            createdDate: new Date(),
            dueDate: null,
            tags: [''],
            doctor: {
                userId: currentUser.userId
            }
        }

        setIsEditing(true)
        setCurrentTask(newTaskInitialState)
    }

    // We need to wait for RTK Query to complete its request before we try and load the results.
    // Here you could render a loading bar/spinner while the request is being fulfilled
    if (!isLoading) return (

        <div className={styles.page} data-testid="tasks-page">
            <div className={styles.header}>
                Tasks
            </div>
            <div className={styles.taskListView}>
                <TaskList
                    taskList={taskData}
                    onOpenCurrentTask={openCurrentTask}
                    onOpenNewTask={openNewTask}
                />
            </div>
            {currentTask ?
                <div className={styles.currentTaskView}>
                    <CurrentTask
                        task={currentTask}
                        onSetIsEditing={setIsEditing}
                        isEditing={isEditing}
                        onCloseCurrentTask={closeCurrentTask}
                        onChangeTitle={setCurrentTaskTitle}
                        onChangeDescription={setCurrentTaskDescription}
                        onChangeDueDate={setCurrentTaskDueDate}
                        onChangeTags={setCurrentTaskTags}
                    />
                </div> :
                <div/>
            }
        </div>
    )
    else
        return (
            <div>Loading</div>
        )
}

export default TasksPage
