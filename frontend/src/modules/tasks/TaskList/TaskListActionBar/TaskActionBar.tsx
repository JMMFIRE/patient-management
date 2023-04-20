import styles from './TaskActionBar.module.scss'
import {Actionbar} from '../../../../common/components'
import {Button} from 'react-bootstrap'
import {Funnel, Plus, QuestionCircle} from 'react-bootstrap-icons'
import React from 'react'

type TaskActionBarProps = {
    numberOfTasks: number,
    onOpenNewTask: () => void
}

const TaskActionBar: React.FC<TaskActionBarProps> = ({ numberOfTasks, onOpenNewTask }) => {

    return (
        <Actionbar header={
            <>
                To be completed
                <div className={styles.taskCount} data-testid="task-count">
                    {numberOfTasks}
                </div>
            </>
        }
        buttons={
            <>
                <Button variant={'light'} onClick={onOpenNewTask} data-testid="new-task-button">
                    <Plus/>
                </Button>
                <Button variant={'light'}>
                    <Funnel/>
                </Button>
                <Button variant={'light'}>
                    <QuestionCircle/>
                </Button>
            </>
        }
        />
    )
}

export default TaskActionBar
