import styles from './PatientRegisterPage.module.scss'
import PatientRegisterActionBar from './PatientRegisterActionBar/PatientRegisterActionBar'
import PatientRegisterTable from './PatientRegisterTable/PatientRegisterTable'
import {useSelector} from 'react-redux'
import {useGetPatientsQuery} from '../../features/patients/PatientsApiSlice'
import React from 'react'
import {RootState} from '../../redux/store'

const PatientRegisterPage = () => {

    const { currentUser } = useSelector((state: RootState) => state.authentication)
    const {data: patientData, isLoading} = useGetPatientsQuery(currentUser.userId)


    // We need to wait for RTK Query to complete its request before we try and load the results.
    // Here you could render a loading bar/spinner while the request is being fulfilled
    if (!isLoading) return (
        <div className={styles.page}>
            <div className={styles.header}>
                Patient Register
                <PatientRegisterActionBar numberOfPatients={patientData?.length}/>
            </div>
            <div className={styles.patientTable} data-testid="patient-table">
                <PatientRegisterTable patientList={patientData}/>
            </div>
        </div>
    )
    else
        return (
            <div>Loading</div>
        )
}

export default PatientRegisterPage
