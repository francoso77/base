import { useState } from 'react';

export interface LoginStateInterface {
  usuario: string
  token: string
  logado: boolean
}

export default function useLoginState() {
  const [loginState, setLoginState] = useState<LoginStateInterface>({
    usuario: 'Frank',
    token: '123',
    logado: true,
  })
  return { loginState, setLoginState }
}