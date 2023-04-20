import styles from './AddPatientForm.module.scss'
import {Button, Col, Form, FormControl, Row} from 'react-bootstrap'
import DatePicker from 'react-datepicker'
import React from 'react'

type AddPatientFormProps = {
    currentPatient: Patient,
    onChangeFirstName: (fName: string) => void,
    onChangeLastName: (lName: string) => void,
    onChangeDOB: (dob: Date | null) => void,
    onChangeSex: (sex: string) => void,
    onChangeDiagnosis: (diagnosis: string) => void,
    onChangeNotes: (notes: string) => void,
    onChangePhoneNumber: (phone: string) => void
}

const AddPatientForm: React.FC<AddPatientFormProps> = (
    {
        currentPatient,
        onChangeFirstName,
        onChangeLastName,
        onChangeDOB,
        onChangeSex,
        onChangeDiagnosis,
        onChangeNotes,
        onChangePhoneNumber
    }
) => {

    return (
        <div className={styles.formWrapper}>
            <Form className={styles.form} data-testid="add-patient-form">

                <Form.Group as={Row} className={styles.group}>
                    <Form.Label column sm={4}>
                        Record number
                    </Form.Label>
                    <Col sm={8}>
                        <Form.Label>Record number will be assigned automatically when you save.</Form.Label>
                    </Col>
                </Form.Group>

                <Form.Group as={Row} className={styles.group}>
                    <Form.Label column sm={4}>
                        First name
                    </Form.Label>
                    <Col sm={6}>
                        <FormControl
                            onChange={input => onChangeFirstName(input.target.value)}
                            data-testid="first-name-field"
                        />
                    </Col>
                </Form.Group>

                <Form.Group as={Row} className={styles.group}>
                    <Form.Label column sm={4}>
                        Last name
                    </Form.Label>
                    <Col sm={6}>
                        <Form.Control
                            onChange={input => onChangeLastName(input.target.value)}
                            data-testid="last-name-field"
                        />
                    </Col>
                </Form.Group>

                <Form.Group as={Row} className={styles.group}>
                    <Form.Label column sm={4} htmlFor="date-of-birth">
                        Date of birth
                    </Form.Label>
                    <Col sm={6}>
                        <DatePicker
                            className="form-control"
                            selected={currentPatient.dateOfBirth}
                            onChange={input => onChangeDOB(input)}
                            id="date-of-birth"
                        />
                    </Col>
                </Form.Group>

                <Form.Group as={Row} className={styles.group}>
                    <Form.Label column sm={4}>
                        Sex
                    </Form.Label>
                    <Col className={styles.sexButtons} sm={6}>
                        <Button
                            variant={currentPatient.sex === 'male' ? 'primary' : 'secondary'}
                            onClick={() => onChangeSex('male')}
                            data-testid="male-button"
                        >
                            Male
                        </Button>
                        <Button
                            variant={currentPatient.sex === 'female' ? 'primary' : 'secondary'}
                            onClick={() => onChangeSex('female')}
                            data-testid="female-button"
                        >
                            Female
                        </Button>
                    </Col>
                </Form.Group>

                <Form.Group as={Row} className={styles.group}>
                    <Form.Label column sm={4}>
                        Diagnosis
                    </Form.Label>
                    <Col sm={6}>
                        <Form.Control
                            onChange={input => onChangeDiagnosis(input.target.value)}
                            data-testid="diagnosis-field"
                        />
                    </Col>
                </Form.Group>

                <Form.Group as={Row} className={styles.group}>
                    <Form.Label column sm={4}>
                        Notes
                    </Form.Label>
                    <Col sm={6}>
                        <Form.Control
                            as="textarea"
                            style={{ height: '7rem' }}
                            onChange={input => onChangeNotes(input.target.value)}
                            data-testid="notes-field"
                        />
                    </Col>
                </Form.Group>

                <Form.Group as={Row} className={styles.group}>
                    <Form.Label column sm={4}>
                        Phone number
                    </Form.Label>
                    <Col sm={6}>
                        <Form.Control
                            onChange={input => onChangePhoneNumber(input.target.value)}
                            data-testid="phone-number-field"
                        />
                    </Col>
                </Form.Group>
            </Form>
        </div>
    )
}

export default AddPatientForm
