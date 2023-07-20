import { CssBaseline } from '@mui/material';
import { ThemeProvider } from '@mui/material/styles';
import { Outlet } from 'react-router-dom';
import { theme } from '../Config/Theme';

import Login from '../Login/Login';
import Footer from './Footer';
import Header from './Header';
import useLoginState from '../Context/LoginState';
import useLayoutState from '../Context/LayoutState';
import useMensagemState from '../Context/MensagemState';
import { GlobalContext } from '../Context/GlobalContext';
import Mensagem from '../Components/Mensagem/Mensagem';

export default function Layout() {

  const { loginState, setLoginState } = useLoginState()
  const { layoutState, setLayoutState } = useLayoutState()
  const { mensagemState, setMensagemState } = useMensagemState()

  return (
    <>
      <h1>teste</h1>
      <CssBaseline />
      <ThemeProvider theme={theme}>
        <GlobalContext.Provider value={{
          loginState: loginState,
          setLoginState: setLoginState,
          layoutState: layoutState,
          setLayoutState: setLayoutState,
          mensagemState: mensagemState,
          setMensagemState: setMensagemState
        }}>
          <>
            {loginState.logado ?
              <>
                <Mensagem />
                <Header />
                <Outlet />
                <Footer />
              </> :
              <>
                <Login />
              </>
            }

          </>

        </GlobalContext.Provider>
      </ThemeProvider>
    </>
  );

}
