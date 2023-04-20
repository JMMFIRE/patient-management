import React from 'react'
import {Nav} from 'react-bootstrap'
import styles from './Sidebar.module.scss'
import SidebarMenuSection from './SidebarMenuSection'
import {
    BarChart,
    Calendar2Event,
    ClipboardCheck,
    ColumnsGap,
    Envelope,
    Gear,
    People,
    QuestionCircle
} from 'react-bootstrap-icons'
import {MenuItem} from './menuItemType'

const Sidebar = () => {

    const sidebarMenu: MenuItem[] = [
        {label: 'Dashboard', icon: <ColumnsGap/>, path: '/dashboard'},
        {label: 'Schedule', icon: <Calendar2Event/>, path: '/schedule'},
        {label: 'Tasks', icon: <ClipboardCheck/>, path: '/tasks'},
        {label: 'Patients', icon: <People/>, path: '/patients'},
        {label: 'Messages', icon: <Envelope/>, path: '/messages'},
        {label: 'Analytics', icon: <BarChart/>, path: '/analytics'}
    ]

    const generalSidebarMenu: MenuItem[] = [
        {label: 'Settings', icon: <Gear/>, path: '/settings'},
        {label: 'Support', icon: <QuestionCircle/>, path: '/support'}
    ]

    return (
        <>
            <Nav className={styles.sidebar}>
                <div className={styles.section}>
                    <div className={styles.header}>MENU</div>
                    <SidebarMenuSection menuItems={sidebarMenu}/>
                    <div className={styles.divider}/>

                    <div className={styles.header}>GENERAL</div>
                    <SidebarMenuSection menuItems={generalSidebarMenu}/>
                    <div className={styles.divider}/>
                </div>
            </Nav>
        </>
    )
}

export default Sidebar
