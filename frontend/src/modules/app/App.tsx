import {Sidebar, Topbar} from '../../common/components'
import 'bootstrap/dist/css/bootstrap.min.css'
import styles from './App.module.scss'
import {Navigate, Route, Routes} from 'react-router'
import {PatientRegisterPage} from '../patientregister'
import {AddPatientPage} from '../addpatient'
import {TasksPage} from '../tasks'
import {LoginPage} from '../login'
import {useSelector} from 'react-redux'
import React from 'react'
import {RootState} from '../../redux/store'

function App() {

    const {isAuthenticated} = useSelector((state: RootState) => state.authentication)

    return (
        <> {isAuthenticated ?
            <div className={styles.app}>
                <Topbar/>
                <Sidebar/>
                <div className={styles.page}>
                    <Routes>
                        <Route path='/'>
                            <Route index element={<Navigate to="dashboard"/>}/>
                            <Route path="dashboard" element={<div>Dashboard</div>}/>
                            <Route path="schedule" element={<div>Schedule</div>}/>
                            <Route path="tasks" element={<TasksPage/>}/>
                            <Route path="patients">
                                <Route index element={<PatientRegisterPage/>}/>
                                <Route path="add-patient" element={<AddPatientPage/>}/>
                            </Route>
                            <Route path="messages" element={<div>Messages</div>}/>
                            <Route path="analytics" element={<div>Analytics</div>}/>
                            <Route path="settings" element={<div>Settings</div>}/>
                            <Route path="support" element={<div>Support</div>}/>
                            <Route path="*" element={<div>404: Not Found</div>}/>
                        </Route>
                    </Routes>
                </div>
            </div>
            :
            <div>
                <Routes>
                    <Route path='/*'>
                        <Route index element={<Navigate to="login"/>}/>
                        <Route path="login" element={<LoginPage/>}/>
                        <Route path="*" element={<div>401: Not Unauthorized</div>}/>
                    </Route>
                </Routes>
            </div>
        }
        </>
    )
}

export default App
