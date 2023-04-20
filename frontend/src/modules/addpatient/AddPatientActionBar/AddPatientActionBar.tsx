import styles from './AddPatientActionBar.module.scss'
import {Button} from 'react-bootstrap'
import {Actionbar} from '../../../common/components'
import {useNavigate} from 'react-router'
import React from 'react'

type AddPatientActionBarProps = {
    onSave: () => void
}

const AddPatientActionBar: React.FC<AddPatientActionBarProps> = ({onSave}) => {

    const navigate = useNavigate()

    return (
        <Actionbar
            header="Add Patient"
            buttons={
                <div className={styles.actions}>
                    <Button
                        className={styles.button}
                        variant="outline-primary"
                        onClick={() => navigate('/patients')}
                        data-testid="cancel-button"
                    >
                               Cancel
                    </Button>
                    <Button
                        className={styles.button}
                        variant="primary"
                        onClick={onSave}
                        data-testid="save-button"
                    >
                               Save
                    </Button>
                </div>
            }
        />
    )
}

export default AddPatientActionBar
