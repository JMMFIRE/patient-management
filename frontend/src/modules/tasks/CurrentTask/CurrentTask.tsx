import styles from './CurrentTask.module.scss'
import CurrentTaskActionBar from './CurrentTaskActionBar/CurrentTaskActionBar'
import {Clock, Tag} from 'react-bootstrap-icons'
import {Form, FormControl} from 'react-bootstrap'
import DatePicker from 'react-datepicker'
import moment from 'moment/moment'
import React from 'react'

type CurrentTaskProps = {
    task: Task,
    isEditing: boolean,
    onSetIsEditing: (isEditing: boolean) => void,
    onCloseCurrentTask: () => void,
    onChangeTitle: (newTitle: string) => void,
    onChangeDescription: (newDescription: string) => void,
    onChangeDueDate: (newDueDate: Date | null) => void,
    onChangeTags: (newTags: string) => void
}
const CurrentTask: React.FC<CurrentTaskProps> = ({
    task,
    isEditing,
    onSetIsEditing,
    onCloseCurrentTask,
    onChangeTitle,
    onChangeDescription,
    onChangeDueDate,
    onChangeTags
}) => {

    return (
        <div className={styles.task} data-testid="current-task-view">
            <CurrentTaskActionBar
                task={task}
                onCloseCurrentTask={onCloseCurrentTask}
                onSetIsEditing={onSetIsEditing}
            />
            {!isEditing ?
                <div className={styles.details}>
                    <div className={styles.header} data-testid="task-title">
                        {task.title}
                    </div>
                    <div className={styles.description} data-testid="task-description">
                        {task.description}
                    </div>
                    <div className={styles.dueDate} data-testid="task-due-date">
                        <Clock className={styles.clockIcon}/>
                        {moment(task.dueDate).format('MM/DD/YYYY')}
                    </div>
                    <div className={styles.tags} data-testid="task-tags">
                        <Tag className={styles.tagIcon}/>
                        {task.tags.map((value) => value + ' ')}
                    </div>
                    <div className={styles.createdOn} data-testid="task-created-date">
                        Created on: {moment(task.createdDate).format('MM/DD/YYYY')}
                    </div>
                </div>
                :
                <Form className={styles.details} data-testid="edit-task-form">
                    <FormControl
                        className={styles.header}
                        value={task.title}
                        onChange={input => onChangeTitle(input.target.value)}
                        data-testid="edit-title-field"
                    />
                    <div className={styles.description}>
                        <FormControl
                            as="textarea"
                            style={{ height: '7rem' }}
                            value={task.description}
                            onChange={input => onChangeDescription(input.target.value)}
                            placeholder="Description"
                            data-testid="edit-description-field"
                        />
                    </div>
                    <div className={styles.dueDate} data-testid="edit-date-container">
                        <Clock className={styles.clockIcon}/>
                        <DatePicker
                            className="form-control"
                            selected={task.dueDate ? new Date(task.dueDate) : null}
                            onChange={input => onChangeDueDate(input)}
                            placeholderText='Date'
                            data-testid="edit-due-date-field"
                        />
                    </div>
                    <div className={styles.tags}>
                        <Tag className={styles.tagIcon}/>
                        <FormControl
                            value={task.tags.join(' ')}
                            onChange={input => onChangeTags(input.target.value)}
                            placeholder="Tags"
                            data-testid="edit-tags-field"
                        />
                    </div>
                    <div className={styles.createdOn} data-testid="task-created-date">
                        Created on: {moment(task.createdDate).format('MM/DD/YYYY')}
                    </div>
                </Form>
            }
        </div>
    )
}

export default CurrentTask
