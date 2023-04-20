import styles from './TaskList.module.scss'
import {StarFill} from 'react-bootstrap-icons'
import TaskActionBar from './TaskListActionBar/TaskActionBar'
import TaskListItem from './TaskListItem/TaskListItem'
import React from 'react'

type TaskListProps = {
    taskList: Task[],
    onOpenCurrentTask: (taskIndex: number) => void,
    onOpenNewTask: () => void
}

const TaskList: React.FC<TaskListProps> = ({ taskList, onOpenCurrentTask, onOpenNewTask }) => {

    return (
        <div className={styles.taskList} data-testid="task-list">
            <TaskActionBar numberOfTasks={taskList.length} onOpenNewTask={onOpenNewTask}/>
            <div className={styles.list}>

                <div className={styles.header}>
                    <div className={styles.star}>
                        <StarFill/>
                    </div>
                    New
                </div>
                {taskList.map((task, index) => (
                    <TaskListItem
                        key={task.taskNumber}
                        taskItem={task}
                        taskItemIndex={index}
                        onOpenCurrentTask={onOpenCurrentTask}
                    />
                ))}
            </div>
        </div>
    )
}

export default TaskList
