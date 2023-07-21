import { useState, useContext } from 'react';
import { URL_SERVIDOR } from '../Config/Setup';
import ComText from '../Components/ComText';
import * as Styled from './styles'
import { GlobalContext, GlobalContextInterface } from '../Context/GlobalContext';
import { Button } from '@mui/material';

interface LoginInterface {
  usuario: string,
  senha: string,
  token: string,
}

export default function Login() {

  const setLoginState = (useContext(GlobalContext) as GlobalContextInterface).setLoginState

  const [login, setLogin] = useState<LoginInterface>({
    usuario: '',
    senha: '',
    token: ''
  })

  const logar = () => {
    let url = URL_SERVIDOR.concat('/usuarios?usuario=')
    url = url.concat(login.usuario)
    url = url.concat('&senha=')
    url = url.concat(login.senha)
    console.log(url)
    setTimeout(() => {

      fetch(url).then(rs => {
        return rs.json()
      }).then((rs: LoginInterface[]) => {

        if (rs.length > 0) {

          setLoginState({
            logado: true,
            usuario: rs[0].usuario,
            token: rs[0].token
          })

        } else {
          console.log('Usuário Não Encontrado')
        }
      }).catch(e => {
        console.log('Erro no Fetch....', e)
      })

    }, 3000)

  }
  return (
    <>
      <section>
        <h1>Log in</h1>
        <fieldset>
          <Styled.Container>
            <ComText
              label='Usuário'
              field=''
              type='text'
            ></ComText>
            <ComText
              label='Senha'
              field=''
              type='password'
            ></ComText>
            <Button
              onClick={() => logar()}
            >Log in</Button>
          </Styled.Container>
        </fieldset>
      </section>
    </>
  )
}