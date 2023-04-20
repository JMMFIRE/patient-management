import styles from './AddPatientPage.module.scss'
import 'react-datepicker/dist/react-datepicker.css'
import {useState} from 'react'
import {useNavigate} from 'react-router'
import AddPatientForm from './AddPatientForm/AddPatientForm'
import AddPatientActionBar from './AddPatientActionBar/AddPatientActionBar'
import {useSelector} from 'react-redux'
import {usePostPatientMutation} from '../../features/patients/PatientsApiSlice'
import React from 'react'
import {RootState} from '../../redux/store'

const AddPatientPage = () => {

    const navigate = useNavigate()
    const [postPatient] = usePostPatientMutation()
    const {currentUser} = useSelector((state: RootState) => state.authentication)

    const newPatientInitialState: Patient = {
        firstName: '',
        lastName: '',
        dateOfBirth: null,
        sex: '',
        diagnosis: '',
        notes: '',
        phoneNumber: '',
        status: 'Awaiting Surgery',
        lastAppointment: new Date('2023-01-18T05:00:00.000+00:00'),
        nextAppointment: new Date('2023-01-20T05:00:00.000+00:00'),
        doctor: {
            userId: currentUser.userId
        }
    }

    const [newPatient, setNewPatient] = useState(newPatientInitialState)


    /**
     * Sets the patient's first name.
     * @param fNameInput First name
     */
    const setPatientFirstName = (fNameInput: string) => {
        setNewPatient({...newPatient, firstName: fNameInput})
    }

    /**
     * Sets the patient's last name.
     * @param lNameInput Last name
     */
    const setPatientLastName = (lNameInput: string) => {
        setNewPatient({...newPatient, lastName: lNameInput})
    }

    /**
     * Sets the patient's date of birth
     * @param dateInput a date
     */
    const setPatientDateOfBirth = (dateInput: Date | null) => {
        setNewPatient({...newPatient, dateOfBirth: dateInput})
    }

    /**
     * Sets the patient's sex
     * @param sexInput the patient's sex
     */
    const setPatientSex = (sexInput: string) => {
        setNewPatient({...newPatient, sex: sexInput})
    }

    /**
     * Sets the patient's diagnosis
     * @param diagnosisInput a diagnosis
     */
    const setPatientDiagnosis = (diagnosisInput: string) => {
        setNewPatient({...newPatient, diagnosis: diagnosisInput})
    }

    /**
     * Sets the patient's notes
     * @param notesInput notes
     */
    const setPatientNotes = (notesInput: string) => {
        setNewPatient({...newPatient, notes: notesInput})
    }

    /**
     * Sets the patient's phone number
     * @param phoneNumberInput a phone number
     */
    const setPatientPhoneNumber = (phoneNumberInput: string) => {
        setNewPatient({...newPatient, phoneNumber: phoneNumberInput})
    }

    /**
     * Saves the currentPatient to the patient list and navigates back to the patient register page
     */
    const saveNewPatient = () => {
        postPatient(newPatient)
        navigate('/patients')
    }

    return(
        <div className={styles.page}>
            <div>
             Patient Register {'>'} Add Patient
            </div>
            <AddPatientActionBar onSave={saveNewPatient}/>
            <AddPatientForm
                currentPatient={newPatient}
                onChangeFirstName={setPatientFirstName}
                onChangeLastName={setPatientLastName}
                onChangeDOB={setPatientDateOfBirth}
                onChangeSex={setPatientSex}
                onChangeDiagnosis={setPatientDiagnosis}
                onChangeNotes={setPatientNotes}
                onChangePhoneNumber={setPatientPhoneNumber}
            />
        </div>
    )
}

export default AddPatientPage
