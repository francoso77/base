import { useState } from 'react'
import { AlertColor } from '@mui/material'

export enum MensagemTipo {
  Warning = 'warning',
  Error = 'error',
  Info = 'info',
  Ok = 'success'
}

export interface MensagemStateInterface {
  exibir: boolean,
  titulo: string,
  mensagem: string,
  tipo: AlertColor,
  modal: boolean
}
export const MensagemStatePadrao: MensagemStateInterface = {
  exibir: false,
  titulo: '',
  mensagem: 'Mensagem a ser exibida',
  tipo: MensagemTipo.Info,
  modal: false
}

export default function useMensagemState() {
  const [mensagemState, setMensagemState] = useState<MensagemStateInterface>(MensagemStatePadrao)
  return { mensagemState, setMensagemState }
}