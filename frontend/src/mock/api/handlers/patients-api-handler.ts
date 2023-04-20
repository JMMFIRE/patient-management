import {rest} from 'msw'

let patientList: Patient []

/**
 * Helper method to reset the data assigned to the patientList for testing
 */
export const resetPatientList = () => {
    const initialPatientList: Patient[] = [
        {
            recordNumber: 1,
            firstName: 'Test',
            lastName: 'Patient1',
            dateOfBirth: new Date('2022-05-29T04:00:00.000+00:00'),
            sex: 'male',
            phoneNumber: '+447277713152',
            diagnosis: 'test diagnosis',
            status: 'Awaiting Surgery',
            notes: 'test notes',
            lastAppointment: new Date('2023-01-18T05:00:00.000+00:00'),
            nextAppointment: new Date ('2023-01-20T05:00:00.000+00:00'),
            doctor: {
                userId: 1,
            }
        },
        {
            recordNumber: 2,
            firstName: 'Test',
            lastName: 'Patient2',
            dateOfBirth: new Date('2022-05-29T04:00:00.000+00:00'),
            sex: 'male',
            phoneNumber: '+447277713152',
            diagnosis: 'test diagnosis',
            status: 'Recovered',
            notes: 'test notes',
            lastAppointment: new Date('2023-01-18T05:00:00.000+00:00'),
            nextAppointment: new Date ('2023-01-20T05:00:00.000+00:00'),
            doctor: {
                userId: 1,
            }
        },
        {
            recordNumber: 3,
            firstName: 'Test',
            lastName: 'Patient3',
            dateOfBirth: new Date('2022-05-29T04:00:00.000+00:00'),
            sex: 'male',
            phoneNumber: '+447277713152',
            diagnosis: 'test diagnosis',
            status: 'On Treatment',
            notes: 'test notes',
            lastAppointment: new Date('2023-01-18T05:00:00.000+00:00'),
            nextAppointment: new Date ('2023-01-20T05:00:00.000+00:00'),
            doctor: {
                userId: 1,
            }
        },
    ]

    patientList = initialPatientList
}

export const handlers = [
    rest.get('http://localhost:8080/patients/doctor/:userid', (req, res, ctx) => {
        return res(ctx.status(200), ctx.json((patientList)))
    }),
    rest.post<Patient>('http://localhost:8080/patients/patient', (req, res, ctx) => {
        const newPatient = {...req.body, recordNumber: 11}

        patientList.push(newPatient)
        return res(ctx.status(200))
    }),
    rest.delete('http://localhost:8080/patients/:patientId', (req, res, ctx) => {
        const { patientId } = req.params
        let response

        if (patientId) {
            const patientIndex = patientList.findIndex((patient) => patient.recordNumber?.toString() === patientId)
            if (patientIndex !== -1) {
                patientList.splice(patientIndex, 1)
                response = res(ctx.status(200))
            } else
                response = res(ctx.status(404))
        }
        return response
    })
]
