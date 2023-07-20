import { useState } from 'react';

export interface LoginStateInterface {
  token: string
  logado: boolean
}

export default function useLoginState() {
  const [loginState, setLoginState] = useState<LoginStateInterface>({
    token: '',
    logado: false
  })
  return { loginState, setLoginState }
}