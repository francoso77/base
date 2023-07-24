import * as React from 'react';
import Menu from '@mui/material/Menu';
//import Avatar from '@mui/material/Avatar';
//import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
//import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import AppBar from '@mui/material/AppBar';
import { GlobalContext, GlobalContextInterface } from '../Context/GlobalContext';


const Offset = styled('div')(({ theme }) => theme.mixins.toolbar);

//const settings = ['Perfil', 'Conta', 'Dashboard', 'Logout'];


export default function Header() {

  const { layoutState, setLayoutState } = React.useContext(GlobalContext) as GlobalContextInterface
  //const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(null);
  const { mensagemState, setMensagemState } = React.useContext(GlobalContext) as GlobalContextInterface

  // const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
  //   setAnchorElUser(event.currentTarget);
  // };

  // const handleCloseUserMenu = () => {
  //   setAnchorElUser(null);
  // };

  const toggleDrawer = () => {
    setLayoutState({ ...layoutState, exibirMenu: !layoutState.exibirMenu })
  };

  const fecharLoading = () => {
    setMensagemState({ ...mensagemState, exibir: false, loading: false, modal: false })
  }

  return (
    <>
      <AppBar onLoad={fecharLoading}>
        <Toolbar>
          <IconButton
            color='inherit'
            aria-label="open drawer"
            onClick={toggleDrawer}
            edge="start"
            sx={{ mr: 2 }}
          >
            <MenuIcon sx={{ width: 32, height: 32 }} />
          </IconButton>
          <Box sx={{ flexGrow: 1 }}>
            <img src="img/logoFundoBranco.png" width={150} alt="Logotipo de empresa" />
          </Box>

        </Toolbar>
      </AppBar>
      <Offset />
    </>
  );
}

/*{
    /<Box sx={{ flexGrow: 0 }}>
                        <Tooltip title="Configurações">
                            <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                                <Avatar alt="Remy Sharp" src="/static/images/avatar/2.jpg" />
                            </IconButton>
                        </Tooltip>
                        <Menu
                            sx={{ mt: '45px' }}
                            id="menu-appbar"
                            anchorEl={anchorElUser}
                            anchorOrigin={{
                                vertical: 'top',
                                horizontal: 'right',
                            }}
                            keepMounted
                            transformOrigin={{
                                vertical: 'top',
                                horizontal: 'right',
                            }}
                            open={Boolean(anchorElUser)}
                            onClose={handleCloseUserMenu}
                        >
                            {settings.map((setting) => (
                                <MenuItem key={setting} onClick={handleCloseUserMenu}>
                                    <Typography textAlign="center">{setting}</Typography>
                                </MenuItem>
                            ))}
                        </Menu>
                    </Box>
}*/