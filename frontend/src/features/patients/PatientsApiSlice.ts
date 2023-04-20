import api from '../../api/api'
import moment from 'moment'

/**
 * Function to inject Patient API endpoints
 *
 */
export const patientsApiSlice = api.injectEndpoints({
    endpoints: (builder) => ({
        getPatients: builder.query({
            query: userId =>  `patients/doctor/${userId}`,
            providesTags: ['Patient']
        }),
        postPatient: builder.mutation({
            query: patient => ({
                url: 'patients/patient',
                body: transformRequestDateFields(patient),
                method: 'POST'
            }),
            invalidatesTags: ['Patient']
        }),
        deletePatient: builder.mutation({
            query: patientId => ({
                url:`patients/${patientId}`,
                method: 'DELETE',
            }),
            invalidatesTags: ['Patient']
        })
    }),
})

/**
 * Transforms the date fields being sent to the server into the correct format
 *
 * @param body Body consisting of a patient objects.
 * @returns {*} A new body with a patient object's modified date fields
 */
const transformRequestDateFields = (body: Patient) => {
    return {
        ...body,
        dateOfBirth: moment(body.dateOfBirth).format('YYYY-MM-DDTHH:mm:ss.SSSZ'),
        lastAppointment: moment(body.lastAppointment).format('YYYY-MM-DDTHH:mm:ss.SSSZ'),
        nextAppointment: moment(body.nextAppointment).format('YYYY-MM-DDTHH:mm:ss.SSSZ')
    }
}

export const {
    useGetPatientsQuery,
    usePostPatientMutation,
    useDeletePatientMutation,
} = patientsApiSlice
