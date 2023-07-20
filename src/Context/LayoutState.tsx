import { useState } from 'react'

export interface LayoutStateInterface {
  aliasDB: string,
  versaoCompleta: string,
  exibirMenu: boolean,
  opcoesDeMenu: string[]
}
export default function useLayoutState() {
  const [layoutState, setLayoutState] = useState<LayoutStateInterface>({
    aliasDB: '',
    versaoCompleta: '',
    exibirMenu: false,
    opcoesDeMenu: []
  })
  return { layoutState, setLayoutState }
}