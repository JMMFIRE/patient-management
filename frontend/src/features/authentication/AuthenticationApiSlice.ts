import api from '../../api/api'

/**
 *  Inject authentication API endpoints.
 *
 */
export const authenticationApiSlice = api.injectEndpoints({
    endpoints: (builder) => ({
        login: builder.mutation({
            query: (body) => ({
                url: 'users/login',
                method: 'POST',
                body
            })
        }),
    }),
})
export const { useLoginMutation } = authenticationApiSlice
