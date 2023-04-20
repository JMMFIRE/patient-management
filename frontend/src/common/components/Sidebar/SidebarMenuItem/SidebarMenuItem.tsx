import styles from './SidebarMenuItem.module.scss'
import {Link, useLocation} from 'react-router-dom'
import cx from 'classnames'
import React from 'react'
import {MenuItem} from '../menuItemType'

type SideBarMenuItemProps = {
    item: MenuItem
}

const SidebarMenuItem: React.FC<SideBarMenuItemProps> = ({item}) => {

    const location = useLocation()

    return (
        <Link
            to={item.path}
            className={cx(styles.root, {[styles.selected]: location.pathname.includes(item.path)})}
            data-testid={(item.label + '-button').toLowerCase()}
        >
            <div className={styles.icon} >
                {item.icon}
            </div>
            <div className={styles.label}>
                {item.label}
            </div>
        </Link>
    )
}

export default SidebarMenuItem
