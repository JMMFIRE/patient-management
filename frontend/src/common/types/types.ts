// DO NOT remove this import.
// There's an issue, that I suspect is a compiler bug, where the typescript compiler is interpreting this unused import.
// If it's not there the compiler won't be able to find these globally defined types.
import {ReactElement} from 'react'

declare global {
    type Task = {
        // We need to set taskNumber as possibly undefined since our server is in charge of generating
        // the taskNumber
        taskNumber?: number,
        title: string,
        description: string,
        completed: boolean,
        createdDate: Date,
        dueDate: Date | null,
        tags: string[],
        doctor: Doctor
    }

    type Doctor = {
        userId: number | null
    }

    export type Patient = {
        recordNumber?: number,
        firstName: string,
        lastName: string,
        dateOfBirth: Date | null,
        sex: string,
        phoneNumber: string,
        diagnosis: string,
        status: 'On Treatment' | 'Recovered' | 'Awaiting Surgery',
        notes: string,
        lastAppointment: Date,
        nextAppointment: Date,
        doctor: Doctor
    }
}
