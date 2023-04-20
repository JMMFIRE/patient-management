import styles from './PatientRegisterTable.module.scss'
import {Dropdown, Table} from 'react-bootstrap'
import {ThreeDots} from 'react-bootstrap-icons'
import {useDeletePatientMutation} from '../../../features/patients/PatientsApiSlice'
import React from 'react'
import moment from 'moment'

type PatientRegisterTableProps = {
    patientList?: Patient[]
}

const PatientRegisterTable: React.FC<PatientRegisterTableProps> = ({patientList}) => {


    const [deletePatient] = useDeletePatientMutation()


    /**
     * Function used to determine the styles className used for a specific patient status cell.
     *
     * @param status String of clinical status in which the patient falls under.
     * @returns {*}
     */
    const determinePatientStatusClassName = (status: string) => {
        let patientStatusClassName
        switch (status) {
        case 'Recovered':
            patientStatusClassName = styles.recovered
            break
        case 'Awaiting Surgery':
            patientStatusClassName = styles.awaitingSurgery
            break
        case 'On Treatment':
            patientStatusClassName = styles.onTreatment
            break
        }
        return patientStatusClassName
    }

    return (
        <Table className={styles.table} >
            <thead className={styles.header}>
                <tr>
                    {/* For whatever reason, when I add a style to the <thead> element the individual header elements
                    won't accept it. I'm adding the header style to each individual <th> element*/}
                    <th className={styles.headerItem}>Name</th>
                    <th className={styles.headerItem}>Diagnosis</th>
                    <th className={styles.headerItem}>Status</th>
                    <th className={styles.headerItem}>Last Appointment</th>
                    <th className={styles.headerItem}>Next Appointment</th>
                    <th className={styles.headerItem}>Options</th>
                </tr>
            </thead>
            <tbody>
                {patientList?.map((patient) => (
                    <tr key={patient.recordNumber}>
                        {/* Bootstrap is doing the same thing with the table rows. It is not letting me override the styling
                    on the actual row element. I need to individually style each data element */}
                        <td className={styles.rowData}>{patient.firstName + ' ' + patient.lastName}</td>
                        <td className={styles.rowData}>
                            {patient.diagnosis}
                        </td>
                        <td className={styles.rowData}>
                            <div className={determinePatientStatusClassName(patient.status)}>
                                {patient.status}
                            </div>
                        </td>
                        <td className={styles.rowData}>{moment(patient.lastAppointment).format('MM/DD/YYYY')}</td>
                        <td className={styles.rowData}>{moment(patient.nextAppointment).format('MM/DD/YYYY')}</td>
                        <td className={styles.rowData}>
                            <Dropdown autoClose="outside">
                                <Dropdown.Toggle className={styles.options} variant="outline-light" data-testid="toggle-options">
                                    <ThreeDots/>
                                </Dropdown.Toggle>

                                <Dropdown.Menu>
                                    <Dropdown.Item>Edit</Dropdown.Item>
                                    <Dropdown.Item
                                        onClick={() => deletePatient(patient.recordNumber)}
                                        data-testid="delete-patient-button"
                                    >
                                    Delete
                                    </Dropdown.Item>
                                </Dropdown.Menu>
                            </Dropdown>
                        </td>
                    </tr>
                ))}
            </tbody>
        </Table>
    )
}

export default PatientRegisterTable
