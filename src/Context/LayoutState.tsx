import { useState } from 'react'
import { EstruturaMenuInterface } from '../Layout/MenuCls'

export interface LayoutStateInterface {
  aliasDB: string,
  versaoCompleta: string,
  exibirMenu: boolean,
  opcoesMenu: EstruturaMenuInterface[]
}
export default function useLayoutState() {
  const [layoutState, setLayoutState] = useState<LayoutStateInterface>({
    aliasDB: '',
    versaoCompleta: '',
    exibirMenu: false,
    opcoesMenu: []
  })
  return { layoutState, setLayoutState }
}