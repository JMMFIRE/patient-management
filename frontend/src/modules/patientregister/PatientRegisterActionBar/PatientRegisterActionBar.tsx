import styles from './PatientRegisterActionBar.module.scss'
import {Funnel, Plus, QuestionCircle, Search} from 'react-bootstrap-icons'
import {Button} from 'react-bootstrap'
import {Actionbar} from '../../../common/components'
import {useNavigate} from 'react-router'
import React from 'react'

type PatientRegisterActionBarProps = {
    numberOfPatients?: number
}
const PatientRegisterActionBar: React.FC<PatientRegisterActionBarProps> = ( {numberOfPatients})  => {

    const navigate = useNavigate()

    return (
        <Actionbar header={
            <>
                Total Patients
                <div className={styles.patientCount}>
                    ({numberOfPatients})
                </div>
            </>
        }
        buttons={
            <>
                <Button variant={'light'} onClick={() => navigate('add-patient')} data-testid="add-patient-button">
                    <Plus/>
                </Button>
                <Button variant={'light'}>
                    <Search/>
                </Button>
                <Button variant={'light'}>
                    <Funnel/>
                </Button>
                <Button variant={'light'}>
                    <QuestionCircle/>
                </Button>
            </>
        }/>
    )
}

export default PatientRegisterActionBar
