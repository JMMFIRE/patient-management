import { EPGLogo} from '..'
import {Nav, Navbar, Form, Button, InputGroup, ListGroup, ListGroupItem} from 'react-bootstrap'
import {Bell, BoxArrowRight, Envelope, Search} from 'react-bootstrap-icons'
import styles from './Topbar.module.scss'
import {useDispatch, useSelector} from 'react-redux'
import {useNavigate} from 'react-router'
import React from 'react'
import {logoutUser} from '../../../features/authentication/AuthenticationSlice'
import {RootState} from '../../../redux/store'


const Topbar = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const {currentUser} = useSelector((state: RootState) => state.authentication)

    const logout = () => {
        dispatch(logoutUser())
        navigate('/login')
    }

    return (
        <>
            <Navbar className={styles.navbar} bg="light" variant="light" data-testid="topbar">
                <Navbar.Brand className={styles.brand}>
                    <EPGLogo/>
                </Navbar.Brand>
                <InputGroup className={styles.search}>
                    <Form.Control
                        placeholder="Search"
                        aria-label="Search"
                    />
                    <Button variant="outline-dark">
                        <Search/>
                    </Button>
                </InputGroup>
                <div className={styles.toolbar}>
                    <ListGroup variant="flush" bsPrefix={styles.userDetails}>
                        <ListGroupItem>{currentUser.firstName + ' ' + currentUser.lastName}</ListGroupItem>
                        <ListGroupItem className="fw-bold">{currentUser.role}</ListGroupItem>
                    </ListGroup>
                    <Form.Group className={styles.currentDate}>
                        <Form.Control placeholder={new Date().toLocaleDateString()} disabled />
                    </Form.Group>
                    <Nav className={styles.icons}>
                        <Nav.Link>
                            <Envelope/>
                        </Nav.Link>
                        <Nav.Link>
                            <Bell/>
                        </Nav.Link>
                        <Nav.Link onClick={logout} data-testid="logout-button">
                            <BoxArrowRight/>
                        </Nav.Link>
                    </Nav>
                </div>
            </Navbar>
        </>
    )
}

export default Topbar
