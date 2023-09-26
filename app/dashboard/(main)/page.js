'use client'
import {Sidebar, Menu, MenuItem, SubMenu} from 'react-pro-sidebar';

export default function Home() {
    return (
        <main>
            <Sidebar>
                <Menu>
                    <SubMenu label="Charts">
                        <MenuItem> Pie charts </MenuItem>
                        <MenuItem> Line charts </MenuItem>
                    </SubMenu>
                    <MenuItem> Documentation </MenuItem>
                    <MenuItem> Calendar </MenuItem>
                </Menu>
            </Sidebar>;
        </main>
    )
}
