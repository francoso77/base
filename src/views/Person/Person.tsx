import { useContext, useEffect, useState } from 'react';
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
import ClsValidaCampo from '../../Services/ClsValidaCampos';

const TEMPO_REFRESH_TEMPORARIO = 500

interface PesquisaInterface {
  nome: string
}

export default function Person() {

  const api: ApiCls = new ApiCls()
  const validaCampo: ClsValidaCampo = new ClsValidaCampo()

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
  const [erros, setErros] = useState({})
  const categorys = ['Despesas', 'Receitas']

  useEffect(() => {
    console.log(document.getElementsByName('nome').values)
  }, [rsPesquisa])

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
    setErros({})
    setPerson(ResetDados)
    setLocalState({ action: actionTypes.incluindo })
  }
  const btCancelar = () => {
    setErros({})
    setPerson(ResetDados)
    setLocalState({ action: actionTypes.pesquisando })
  }

  const validarDados = (): boolean => {
    let retorno: boolean = true
    let erros: { [key: string]: string } = {}

    if (validaCampo.campoVazio(person.name)) {
      retorno = false
      erros.name = 'Nome Não pode ser Vazio!'
    }
    setErros(erros)
    return retorno
  }

  const btConfirmar = () => {
    console.log('dados foi validado? ', validarDados())

    if (validarDados()) {
      let msg1: string = ''
      let msg2: string = ''
      let msg3: string = 'Cadastro de Pessoas não atualizado!'
      let url_ativa: string = '/person/'.concat(person.idPerson.toString())
      let body: PersonInterface | string = person

      if (localState.action === actionTypes.incluindo) {
        msg1 = 'Incluíndo dados em Pessoa...'
        msg2 = 'Pessoa cadastrado com sucesso!'
        url_ativa = '/person'
      } else if (localState.action === actionTypes.excluindo) {
        msg1 = 'Excluíndo Pessoa do cadastro ...'
        msg2 = 'Pessoa excluída com sucesso!'
        msg3 = 'Pessoa não excluído!'
        body = ''
      } else if (localState.action === actionTypes.editando) {
        msg1 = 'Editando dados da Pessoa...'
        msg2 = 'Pessoa alterada com sucesso!'
      }

      api.query<any>(url_ativa, body, msg1, mensagemState, setMensagemState, localState)
        .then(rs => {
          setMensagemState({
            ...mensagemState,
            titulo: 'Confirmado!',
            exibir: true,
            mensagem: msg2,
            tipo: MensagemTipo.Info,
            exibirBotao: true,
            cb: () => btPesquisar()
          })
          setPerson(ResetDados)
          setLocalState({ action: 'pesquisando' })
        }).catch(() => {

          setMensagemState({
            ...mensagemState,
            exibir: true,
            mensagem: msg3,
            tipo: MensagemTipo.Error,
            exibirBotao: true
          })
        })
    }
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
            mensagem: ''
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
                    mapKeyPress={[{ key: 'Enter', onKey: btPesquisar }]}
                    autofocus={true}
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
                    field="name"
                    setState={setPerson}
                    disabled={localState.action === 'excluindo' ? true : false}
                    erros={erros}
                  />
                </Grid>

                <Grid item xs={12} sm={10} mt={3}>
                  <Box>
                    <FormControl fullWidth>
                      <InputLabel id="demo-simple-select-label">Categoria</InputLabel>
                      <Select
                        sx={{ my: 0, py: 0, height: 40 }}
                        disabled={localState.action === 'excluindo' ? true : false}
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={person.category.toString()}
                        label="Categoria"
                        onChange={handleChangeCategory}
                        required
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
              <Button sx={{ marginTop: 3 }} variant="contained" onClick={btConfirmar} >Confirmar Inclusão</Button>
            }

            {localState.action === 'editando' &&
              <Button sx={{ marginTop: 3 }} variant="contained" onClick={btConfirmar} >Confirmar Edição</Button>
            }

            {localState.action === 'excluindo' &&
              <Button sx={{ marginTop: 3 }} variant="contained" onClick={btConfirmar} >Confirmar Exclusão</Button>
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
