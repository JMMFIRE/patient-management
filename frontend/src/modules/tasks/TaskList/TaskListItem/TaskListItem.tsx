import styles from './TaskListItem.module.scss'
import FormCheckInput from 'react-bootstrap/FormCheckInput'
import {Button} from 'react-bootstrap'
import {ThreeDots} from 'react-bootstrap-icons'
import {usePatchTaskMutation} from '../../../../features/tasks/TasksApiSlice'
import React from 'react'
import moment from 'moment'

type TaskListItemProps = {
    taskItem: Task,
    taskItemIndex: number,
    onOpenCurrentTask: (taskIndex: number) => void,
}

const TaskListItem: React.FC<TaskListItemProps> = ({taskItem, taskItemIndex, onOpenCurrentTask}) => {

    const [patchTaskCompleted] = usePatchTaskMutation()

    return(
        <div className={styles.taskItem}>
            <FormCheckInput
                className={styles.checkBox}
                defaultChecked={taskItem.completed}
                onChange={() => patchTaskCompleted({
                    taskId: taskItem.taskNumber,
                    body: {
                        completed: !taskItem.completed
                    }
                })
                }
                data-testid="completed-checkbox"
            />
            <div>
                <div className={styles.title} data-testid="task-list-item-title">
                    {taskItem.title}
                    <div className={styles.dueDate} data-testid="task-list-item-due-date">
                        {moment(taskItem.dueDate).format('MM/DD/YYYY')}
                    </div>
                </div>
            </div>
            <Button
                variant={'outline-light'}
                className={styles.options}
                onClick={() => onOpenCurrentTask(taskItemIndex)}
                data-testid="open-button"
            >
                <ThreeDots/>
            </Button>
        </div>
    )
}

export default TaskListItem
