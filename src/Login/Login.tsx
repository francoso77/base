import { useState } from 'react'
import { LoginStateInterface } from '../Context/LoginState'

export default function Login() {
  const [loginState, setLoginState] = useState<LoginStateInterface>({
    token: '',
    logado: true
  })
  return (
    <>
      <section>
        <h1>Log in</h1>
        <fieldset>
          <label htmlFor="txtUsuario">Usuário</label>
          <input type="text" name="txtUsuario" id="txtUsuario" />
          <label htmlFor="txtPassword">Senha</label>
          <input type="password" name="txtSenha" id="txtSenha" />
          <button type="button">Log in</button>
          <button type="button">Cancelar</button>
        </fieldset>
      </section>
    </>
  )
}