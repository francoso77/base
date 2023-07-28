import { useContext, useState } from 'react';
import { URL_SERVIDOR } from '../../Config/Setup';
import Button from '@mui/material/Button';
import { Box, FormControl, Grid, IconButton, InputLabel, MenuItem, Paper, Select, SelectChangeEvent, Typography } from '@mui/material';
import Container from '@mui/material/Container';
import { useNavigate } from 'react-router-dom';
import CloseIcon from '@mui/icons-material/Close';
import { PersonInterface } from '../../interfaces/PersonInterface';
import { GlobalContext, GlobalContextInterface } from '../../Context/GlobalContext';
import { ActionInterface, actionTypes } from '../../interfaces/ActionInterface';
import { MensagemTipo } from '../../Context/MensagemState';
import ComText from '../../Components/ComText';
import DataTable, { DataTableCabecalhoInterface } from '../../Components/DataTable';
import ApiCls from '../../Services/ApiCls';

const TEMPO_REFRESH_TEMPORARIO = 500

interface PesquisaInterface {
  nome: string
}

export default function Person() {

  const api: ApiCls = new ApiCls()

  const Cabecalho: Array<DataTableCabecalhoInterface> = [
    {
      campo: 'idPerson',
      cabecalho: 'Id',
      alinhamento: 'left'
    },
    {
      campo: 'name',
      cabecalho: 'Nome',
      alinhamento: 'left'
    },
    {
      campo: 'category',
      cabecalho: 'Categoria',
      alinhamento: 'left',
    }
  ]

  const ResetDados: PersonInterface = {
    idPerson: 0,
    name: '',
    category: 0
  }

  const { mensagemState, setMensagemState } = useContext(GlobalContext) as GlobalContextInterface
  const [localState, setLocalState] = useState<ActionInterface>({ action: actionTypes.pesquisando })
  const [rsPesquisa, setRsPesquisa] = useState<Array<PersonInterface>>([])
  const [pesquisa, setPesquisa] = useState<PesquisaInterface>({ nome: '' })
  const [person, setPerson] = useState<PersonInterface>(ResetDados)

  const categorys = ['Despesas', 'Receitas']

  const handleChangeCategory = (event: SelectChangeEvent) => {
    let cat: number = parseInt(event.target.value as string)
    setPerson({ ...person, category: cat })
  };

  const btEditar = (rs: PersonInterface) => {
    setPerson(rs)
    setLocalState({ action: actionTypes.editando })
  }
  const btExcluir = (rs: PersonInterface) => {
    setPerson(rs)
    setLocalState({ action: actionTypes.excluindo })
  }
  const btIncluir = () => {
    setLocalState({ action: actionTypes.incluindo })
  }
  const btCancelar = () => {
    setLocalState({ action: actionTypes.pesquisando })
    btPesquisar()
  }

  const btConfirmarExclusao = () => {
    api.query<any>('/person/'.concat(person.idPerson.toString()), 'Excluíndo Pessoa ...', mensagemState, setMensagemState, localState)
      .then(rs => {
        setMensagemState({
          ...mensagemState,
          titulo: 'Confirmado!',
          exibir: true,
          mensagem: 'Pessoa excluído com sucesso!',
          tipo: MensagemTipo.Info,
          exibirBotao: true
        })
        console.log(rs)
        setPerson(ResetDados)
        setLocalState({ action: 'pesquisando' })
        //btPesquisar()
      }).catch(() => {

        setMensagemState({
          ...mensagemState,
          exibir: true,
          mensagem: 'Pessoa não excluído!',
          tipo: MensagemTipo.Error,
          exibirBotao: true
        })
      })
  }


  const btConfirmarEdicao = () => {
    setMensagemState({ ...mensagemState, exibir: true, mensagem: 'Alterando dados....', tipo: MensagemTipo.Info })

    setTimeout(() => {
      fetch(URL_SERVIDOR.concat('/person/'.concat(person.idPerson.toString())), {
        body: JSON.stringify(person),
        headers: {
          'Content-Type': 'application/json',
        },
        method: 'PUT'

      }).then(rs => {
        if (rs.ok) {

          setMensagemState({
            ...mensagemState,
            titulo: 'Confirmado!',
            exibir: true,
            mensagem: localState.action === actionTypes.incluindo ? 'Pessoa cadastrado com sucesso!' : 'Dados Alterados!',
            tipo: MensagemTipo.Info,
            exibirBotao: true
          })

          setPerson(ResetDados)

          setLocalState({ action: 'pesquisando' })

          btPesquisar()

        } else {
          setMensagemState({
            ...mensagemState,
            exibir: true,
            mensagem: 'Cadastro de Pessoas não atualizado!',
            tipo: MensagemTipo.Error,
            exibirBotao: true
          })
        }
      }).catch(() => {
        setMensagemState({
          ...mensagemState,
          exibir: true,
          mensagem: 'Erro na conexão com o bando de dados!',
          tipo: MensagemTipo.Error,
          exibirBotao: true
        })
      })
    }, TEMPO_REFRESH_TEMPORARIO)
  }

  const btConfirmarInclusao = () => {

    setMensagemState({ ...mensagemState, exibir: true, mensagem: 'Incluindo dados....', tipo: MensagemTipo.Info })

    setTimeout(() => {
      fetch(URL_SERVIDOR.concat('/person'), {
        body: JSON.stringify(person),
        headers: {
          'Content-Type': 'application/json',
        },
        method: 'POST'
      }).then(rs => {
        if (rs.ok) {
          setMensagemState({
            ...mensagemState,
            titulo: 'Confirmado!',
            exibir: true,
            mensagem: localState.action === actionTypes.incluindo ? 'Pessoa cadastrado com sucesso!' : 'Dados Alterados!',
            tipo: MensagemTipo.Info,
            exibirBotao: true
          })

          setPerson(ResetDados)

          btCancelar()
        } else {
          setMensagemState({
            ...mensagemState,
            exibir: true,
            mensagem: 'Cadastro de Pessoas não atualizado!',
            tipo: MensagemTipo.Error,
            exibirBotao: true
          })
        }
      }).catch(() => {
        setMensagemState({
          ...mensagemState,
          exibir: true,
          mensagem: 'Erro na conexão com o bando de dados!',
          tipo: MensagemTipo.Error,
          exibirBotao: true
        })
      })
    }, TEMPO_REFRESH_TEMPORARIO)
  }

  const btPesquisar = () => {
    setMensagemState({
      ...mensagemState,
      titulo: 'Processando',
      mensagem: 'Recebendo Pessoas ...',
      exibir: true,
      tipo: MensagemTipo.Loading,
      exibirBotao: false,
      cb: null
    })

    setTimeout(() => {

      fetch(URL_SERVIDOR.concat('/person?name_like='.concat(pesquisa.nome)), {
        headers: {
          'Content-Type': 'application/json',
        },
        method: 'GET'
      }).then(rs => {

        if (rs.ok) {
          setMensagemState({
            ...mensagemState,
            exibir: false,
          })
          return rs.json()

        } else {
          setMensagemState({
            ...mensagemState,
            titulo: 'Erro! Consulte Suporte!',
            exibir: true,
            mensagem: 'Erro ao consultar Pessoas!',
            tipo: MensagemTipo.Error,
            exibirBotao: true
          })
        }
      }).then((rsPerson: PersonInterface[]) => {

        setRsPesquisa(rsPerson)

      }).catch(() => {
        setMensagemState({
          ...mensagemState,
          exibir: true,
          mensagem: 'Erro na conexão com o bando de dados!',
          tipo: MensagemTipo.Error,
          exibirBotao: true
        })
      })

    }, TEMPO_REFRESH_TEMPORARIO)

  }
  const irpara = useNavigate()

  const btFechar = () => {
    irpara('/')
  }

  return (
    <>
      <Container maxWidth="md" sx={{ mt: 5 }}>
        <Paper variant="outlined" sx={{ padding: 2 }}>

          <Grid container sx={{ display: 'flex', alignItems: 'center' }}>

            <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'space-between', mb: 3 }}>
              <Typography component="h5" variant="h5" align="left">
                Cadastro de Pessoas
                <Typography variant="body2" gutterBottom>
                  Cadastro de clientes e fornecedores para controle financeiro
                </Typography>
              </Typography>

              <IconButton onClick={() => btFechar()}>
                <CloseIcon />
              </IconButton>
            </Grid>

            {localState.action === 'pesquisando' &&

              <>
                <Grid item xs={12} sm={10} sx={{ mb: 3 }}>
                  <ComText
                    label="Digite o nome"
                    type="text"
                    dados={pesquisa}
                    field="nome"
                    setState={setPesquisa}
                    iconeEnd='searchicon'
                    onClickIconeEnd={() => btPesquisar()}
                  />

                </Grid>
                <Grid item xs={12} sm={2} sx={{ textAlign: 'center' }}>
                  <Button variant='contained' onClick={() => btIncluir()}>Incluir</Button>
                </Grid>
              </>
            }

            {localState.action !== 'pesquisando' &&
              <>
                <Grid item xs={12} sm={10} mt={3}>
                  <ComText
                    label="Nome"
                    type="text"
                    dados={person}
                    field="name" setState={setPerson}
                    disabled={localState.action === 'excluindo' ? true : false}
                  />
                </Grid>

                <Grid item xs={12} sm={10} mt={3}>
                  <Box>
                    <FormControl fullWidth>
                      <InputLabel id="demo-simple-select-label">Categoria</InputLabel>
                      <Select
                        disabled={localState.action === 'excluindo' ? true : false}
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={person.category.toString()}
                        label="Categoria"
                        onChange={handleChangeCategory}
                        sx={{ padding: 0, margin: 0 }}
                      >
                        {categorys.map((category, i) => (
                          <MenuItem key={i} value={i}>{category}</MenuItem>
                        ))}

                      </Select>

                    </FormControl>
                  </Box>
                </Grid>
              </>
            }

            {localState.action === 'incluindo' &&
              <Button sx={{ marginTop: 3 }} variant="contained" onClick={btConfirmarInclusao} >Confirmar Inclusão</Button>
            }

            {localState.action === 'editando' &&
              <Button sx={{ marginTop: 3 }} variant="contained" onClick={btConfirmarEdicao} >Confirmar Edição</Button>
            }

            {localState.action === 'excluindo' &&
              <Button sx={{ marginTop: 3 }} variant="contained" onClick={btConfirmarExclusao} >Confirmar Exclusão</Button>
            }

            {localState.action !== 'pesquisando' &&
              <Button sx={{ marginTop: 3, marginLeft: 1 }} variant="contained" onClick={btCancelar}>Cancelar</Button>
            }

            {
              localState.action === 'pesquisando' &&
              <Grid item xs={12} sx={{ mt: 3 }}>
                <DataTable
                  dados={rsPesquisa}
                  cabecalho={Cabecalho}
                  onEditar={btEditar}
                  onExcluir={btExcluir}
                />
              </Grid>
            }
          </Grid>
        </Paper>
      </Container>
    </>
  )
}
