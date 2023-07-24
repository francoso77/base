import React, { useContext } from 'react'

import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import { styled } from '@mui/material/styles';
import { GlobalContext, GlobalContextInterface } from '../Context/GlobalContext';
import { ListItemIcon, MenuItem } from '@mui/material';
import Settings from '@mui/icons-material/Settings';
import Logout from '@mui/icons-material/Logout';
//import MenuItem from './MenuItem';
//import { EstruturaMenuInterface } from './MenuCls';
// import MenuCls from './MenuCls';

const drawerWidth = 240;

const Offset = styled('div')(({ theme }) => theme.mixins.toolbar);

export default function Menu() {

    const { layoutState, setLayoutState } = useContext(GlobalContext) as GlobalContextInterface

    // const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

    const handleClose = () => {
        setLayoutState({ ...layoutState, exibirMenu: false }) 
    };

    return (
        <>
            <Drawer
                sx={{
                    width: drawerWidth,
                    flexShrink: 0,
                    [`& .MuiDrawer-paper`]: { width: drawerWidth, boxSizing: 'border-box', marginBottom: -100 },
                    zIndex: (theme) => theme.zIndex.appBar - 1
                }}
                anchor='left'
                open={layoutState.exibirMenu}
                onClose={handleClose}
            >
                <Toolbar />
                <Box sx={{ overflow: 'auto' }}>
                    <List
                        sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}
                        component="nav"
                        aria-labelledby="nested-list-subheader"
                    >
                        {/* {layoutState.opcoesMenu.map( ( menu: EstruturaMenuInterface, indice: number ) =>
              <MenuItem key={indice} menu={menu} />
            )} */}
                        <MenuItem onClick={handleClose}>
                            <ListItemIcon>
                                <Settings fontSize="small" />
                            </ListItemIcon>
                            Settings
                        </MenuItem>
                        <MenuItem onClick={handleClose}>
                            <ListItemIcon>
                                <Logout fontSize="small" />
                            </ListItemIcon>
                            Logout
                        </MenuItem>
                    </List>
                    <Offset />
                </Box>
            </Drawer>
        </>
    )
}