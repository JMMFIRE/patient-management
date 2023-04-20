import styles from './Actionbar.module.scss'
import React, {ReactNode} from 'react'

type ActionbarProps = {
    header: ReactNode,
    buttons: ReactNode
}

const Actionbar: React.FC<ActionbarProps> = ({ header, buttons }) => {

    return (
        <div className={styles.actionBar}>
            <div className={styles.header}>
                {header}
            </div>
            <div className={styles.actionMenu}>
                {buttons}
            </div>
        </div>
    )
}

export default Actionbar
