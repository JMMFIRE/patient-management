import SidebarMenuItem from './SidebarMenuItem/SidebarMenuItem'
import {Nav} from 'react-bootstrap'
import React from 'react'
import {MenuItem} from './menuItemType'

type SidebarMenuSectionProps = {
 menuItems: MenuItem[]
}


const SidebarMenuSection: React.FC<SidebarMenuSectionProps> = ({menuItems}) => {

    return (
        <>
            {menuItems.map(function (menuItem, index) {
                return (
                    <Nav key={index}>
                        <SidebarMenuItem item={menuItem}/>
                    </Nav>
                )
            })}
        </>
    )

}

export default SidebarMenuSection
