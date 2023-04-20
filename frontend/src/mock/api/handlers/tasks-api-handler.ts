import {rest} from 'msw'

let taskList: Task[]

type TaskCompletedRequest = {
    completed: boolean
}

/**
 * Helper method to reset the data assigned to the taskList for testing
 */
export const resetTaskList = () => {
    const initialTaskList: Task [] = [
        {
            taskNumber: 6383,
            title: 'Test Task',
            description: '',
            completed: false,
            createdDate: new Date('2023-02-27T05:00:00.000+00:00'),
            dueDate: new Date('2023-02-15T05:00:00.000+00:00'),
            tags: [],
            doctor: {
                userId: 1
            }
        },
        {
            taskNumber: 6384,
            title: 'Test Task 2',
            description: '',
            completed: true,
            createdDate: new Date ('2023-02-27T05:00:00.000+00:00'),
            dueDate: new Date('2023-02-15T05:00:00.000+00:00'),
            tags: ['a', 'test', 'tag'],
            doctor: {
                userId: 1
            }
        }
    ]

    taskList = initialTaskList
}

export const handlers = [
    rest.get('http://localhost:8080/tasks/doctor/:userId', (req, res, ctx) => {
        return res(ctx.status(200), ctx.json(taskList))
    }),
    rest.post<Task>('http://localhost:8080/tasks/task', (req, res, ctx) => {
        const newTask = {...req.body, taskNumber: 11}

        taskList.push(newTask)
        return res(ctx.status(200))
    }),
    rest.delete('http://localhost:8080/tasks/:taskId', (req, res, ctx) => {
        const { taskId } = req.params
        let response

        if (taskId) {
            const taskIndex = taskList.findIndex((task) => task.taskNumber?.toString() === taskId)
            if (taskIndex !== -1) {
                taskList.splice(taskIndex, 1)
                response = res(ctx.status(200))
            } else
                response = res(ctx.status(404))
        }
        return response
    }),
    rest.put<Task>('http://localhost:8080/tasks/:taskId', (req, res, ctx) => {
        const { taskId } = req.params
        const task = req.body
        let response

        if (taskId) {
            const taskIndex = taskList.findIndex((task) => task.taskNumber?.toString() === taskId)
            if (taskIndex !== -1) {
                taskList[taskIndex] = task
                response = res(ctx.status(200))
            } else
                response = res(ctx.status(404))
        }
        return response
    }),
    rest.patch<TaskCompletedRequest>('http://localhost:8080/tasks/:taskId', (req, res, ctx) => {
        const { taskId } = req.params
        const { completed } = req.body
        let response

        if (taskId) {
            const taskIndex = taskList.findIndex((task) => task.taskNumber?.toString() === taskId)
            if (taskIndex !== -1) {
                taskList[taskIndex] = {...taskList[taskIndex], completed}
                response = res(ctx.status(200))
            } else
                response = res(ctx.status(404))
        }
        return response
    })
]
