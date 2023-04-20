import api from '../../api/api'
import moment from 'moment'

/**
 * Inject Task API endpoints
 *
 */
export const tasksApiSlice = api.injectEndpoints({
    endpoints: (builder) => ({
        getTasks: builder.query({
            query: userId => `tasks/doctor/${userId}`,
            providesTags: ['Task']
        }),
        postTask: builder.mutation({
            query: task => ({
                url: 'tasks/task',
                body: transformRequestDateFields(task),
                method: 'POST'
            }),
            invalidatesTags: ['Task']
        }),
        deleteTask: builder.mutation({
            query: taskId => ({
                url:`tasks/${taskId}`,
                method: 'DELETE'
            }),
            invalidatesTags: ['Task']
        }),
        putTask: builder.mutation({
            query: task => ({
                url: `tasks/${task.taskNumber}`,
                body: transformRequestDateFields(task),
                method: 'PUT'
            }),
            invalidatesTags: ['Task']
        }),
        patchTask: builder.mutation({
            query: ({taskId, body}) => ({
                url: `tasks/${taskId}`,
                method: 'PATCH',
                body
            }),
            invalidatesTags: ['Task']
        })
    })
})

/**
 * Transforms the date fields being sent to the server into the correct format
 *
 * @param body Body consisting of a task object.
 * @returns {*} A new body with a task object's modified date fields
 */
const transformRequestDateFields = (body: Task) => {
    return {
        ...body,
        createdDate: moment(body.createdDate).format('YYYY-MM-DDTHH:mm:ss.SSSZ'),
        dueDate: moment(body.dueDate).format('YYYY-MM-DDTHH:mm:ss.SSSZ')
    }
}

export const {
    useGetTasksQuery,
    usePostTaskMutation,
    useDeleteTaskMutation,
    usePutTaskMutation,
    usePatchTaskMutation
} = tasksApiSlice
