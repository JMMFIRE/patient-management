import {createApi} from '@reduxjs/toolkit/query/react'
import {fetchBaseQuery} from '@reduxjs/toolkit/dist/query/react'


// Project's base API. Will be expanded on in individual API slices.
const api = createApi({
    reducerPath: 'api',
    baseQuery: fetchBaseQuery(
        {
            baseUrl: 'http://localhost:8080'
        }),
    tagTypes: [
        'Patient', 'Task'
    ],
    endpoints: () => ({}),
})

export default api
