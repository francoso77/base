import { useState } from 'react';

export interface LoginStateInterface {
  usuario: string
  token: string
  logado: boolean
}

export default function useLoginState() {
  const [loginState, setLoginState] = useState<LoginStateInterface>({
    usuario: '',
    token: '',
    logado: false
  })
  return { loginState, setLoginState }
}