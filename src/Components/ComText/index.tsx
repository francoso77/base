import React from 'react';
import { OutlinedInput, Typography, IconButton, InputAdornment, Icon, FormControl, TextField, FormControlLabel, Checkbox } from '@mui/material';
import * as Styled from './styles';
import Condicional from '../Condicional/Condicional';

// interface TextProps {
//   bgColor: string;
//   hoverColor: string;
//   children: any;
// }
// export const Text: React.FC<TextProps> = ({ bgColor, hoverColor, children }) => {

//   return (
//     <Styled.TextCustom bgColor={bgColor} hoverColor={hoverColor}>
//       {children}
//     </Styled.TextCustom>
//   )
// };
interface mapKeyPressInterface {
  key: string
  onKey: () => void
}
interface StateSenha {
  Senha: string;
  MostarSenha: boolean;
}
interface ComTextInterface {
  label: string,
  disabled?: boolean,
  type?: string,
  placeholder?: string,
  dados: { [key: string]: string | number | readonly string[] | undefined | any },
  erros?: { [key: string]: string },
  field: string,
  setState: React.Dispatch<React.SetStateAction<any>>
  iconeEnd?: string,
  onClickIconeEnd?: () => void
  iconeStart?: string
  onClickIconeStart?: () => void
  mapKeyPress?: Array<mapKeyPressInterface>
  tipo?: 'text' | 'checkbox',
  valida?: string,
}
export default function ComText({
  label,
  dados,
  field,
  setState,
  disabled = false,
  type = 'text',
  placeholder = label,
  iconeStart = '',
  onClickIconeStart = () => { },
  iconeEnd = '',
  onClickIconeEnd = () => { },
  mapKeyPress = [],
  tipo = 'text',
  erros = {},
  valida = ''
}: ComTextInterface) {

  const [valuesSenha, setValuesSenha] = React.useState<StateSenha>({
    Senha: '',
    MostarSenha: false,
  })

  const onKey = (key: string) => {
    if (mapKeyPress.length > 0) {
      let encontrou: boolean = false
      for (let contador: number = 0; contador < mapKeyPress.length && !encontrou; contador++) {
        if (mapKeyPress[contador].key === key) {
          encontrou = true
          mapKeyPress[contador].onKey()
        }
      }
    }
  }

  const exibirIcone = (posicao: 'start' | 'end', icone: string, onclick: () => void) => {
    if (icone.length > 0) {
      return (
        <InputAdornment position={posicao} sx={{ margin: 0, padding: 0 }}>
          <IconButton sx={{ margin: 0, padding: 0 }} onClick={() => {
            if (onclick) {
              onclick()
            }
          }}>
            <Icon sx={{ margin: 0, padding: 0 }}>{icone}</Icon>
          </IconButton>
        </InputAdornment>
      )
    }
  }

  if (tipo === 'checkbox') {

    return (
      <>
        <FormControlLabel
          sx={{ width: '100%' }}
          label={label}
          control={
            <Checkbox
              checked={dados[field]}
              onChange={(e) => setState({ ...dados, [field]: e.target.checked })}
              disabled={disabled}
            />
          }
        />
      </>
    )
  } else if (tipo === 'text') {
    return (
      <>
        <FormControl sx={{ width: '100%' }}>
          <Typography
            variant='body2'
            textAlign='left'
            sx={{ mt: 1 }}
          >
            {label}
          </Typography>
          <OutlinedInput
            value={dados[field]}
            sx={{ my: 0, py: 0, height: 40 }}
            placeholder={placeholder}
            disabled={disabled}
            type={type}
            onChange={(e) => setState({ ...dados, [field]: e.target.value })}
            endAdornment={exibirIcone('end', iconeEnd, onClickIconeEnd)}
            startAdornment={exibirIcone('start', iconeStart, onClickIconeStart)}
            onKeyDown={(ev) => onKey(ev.key)}
          />
          <Condicional condicao={typeof erros[field] !== 'undefined'}>
            <Typography variant='caption' textAlign='left' color='warning.main' >{erros[field]}</Typography>
          </Condicional>
        </FormControl>
      </>
    )
  } else {
    return (<></>)
  }
}