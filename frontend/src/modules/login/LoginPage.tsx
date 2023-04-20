import styles from './LoginPage.module.scss'
import {Button, Form} from 'react-bootstrap'
import {PatientRegisterDemoView} from '../../common/components'
import {useNavigate} from 'react-router'
import {useDispatch} from 'react-redux'
import {loginUser} from '../../features/authentication/AuthenticationSlice'
import {useEffect, useState} from 'react'
import React from 'react'
import {useLoginMutation} from '../../features/authentication/AuthenticationApiSlice'


const LoginPage = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const [login, {data: loginData, error}] = useLoginMutation()
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [isInvalid, setIsInvalid] = useState(false)


    /**
     * useEffect is waiting for a change in state. When it detects that change, it'll check whether loginData exists.
     * If it does, it'll complete the login process by calling dispatch(loginUser()) and then navigate to the home page.
     *
     */
    useEffect(() => {
        if (loginData) {
            dispatch(loginUser(loginData))
            navigate('/')
        } else if (error) {
            setIsInvalid(true)
        }
    }, [error, loginData, dispatch, navigate])

    /**
     * Authenticates the user by sending the email and password to the server.
     *
     * @returns {Promise<void>}
     */
    const authenticateUser = async () => {
        const formData = {
            email,
            password
        }

        await login(formData)
    }

    return (
        <div className={styles.page}>
            <Form className={styles.loginForm} data-testid="login-form">
                <div className={styles.header}>
                    Welcome to Patient Management App
                </div>
                <div className={styles.subHeader}>
                    Login
                </div>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control
                        type="email"
                        placeholder="Enter email"
                        onChange={input => setEmail(input.target.value)}
                        isInvalid={isInvalid}
                        data-testid="login-email-field"
                    />
                    <Form.Control.Feedback type="invalid" data-testid="invalid-login">
                        Username or password does not match
                    </Form.Control.Feedback>
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control
                        type="password"
                        placeholder="Password"
                        onChange={input => setPassword(input.target.value)}
                        data-testid="login-password-field"
                    />
                </Form.Group>

                <Button
                    className={styles.submitButton}
                    variant="primary"
                    type="button"
                    onClick={authenticateUser}
                    data-testid="login-button"
                >
                    Submit
                </Button>
            </Form>
            <div className={styles.demoView}>
                <div>
                    <PatientRegisterDemoView/>
                </div>
            </div>
        </div>
    )
}

export default LoginPage
