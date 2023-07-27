import { useContext, useState } from 'react';
import { URL_SERVIDOR } from '../../Config/Setup';
import Button from '@mui/material/Button';
import { Box, FormControl, Grid, IconButton, InputLabel, MenuItem, Paper, Select, SelectChangeEvent, Typography } from '@mui/material';
import Container from '@mui/material/Container';
import { useNavigate } from 'react-router-dom';
import CloseIcon from '@mui/icons-material/Close';
import SearchIcon from '@mui/icons-material/Search';
import React from 'react';
import { PersonInterface } from '../../interfaces/PersonInterface';
import { GlobalContext, GlobalContextInterface } from '../../Context/GlobalContext';
import { ActionInterface, actionTypes } from '../../interfaces/ActionInterface';
import { MensagemTipo } from '../../Context/MensagemState';
import ComText from '../../Components/ComText';
import DataTable, { DataTableCabecalhoInterface } from '../../Components/DataTable';


const TEMPO_REFRESH_TEMPORARIO = 500

interface PesquisaInterface {
  nome: string
}

export default function Person() {

  const Cabecalho: Array<DataTableCabecalhoInterface> = [
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

  // const printTable = () =>
  //   rsPesquisa.map((person) =>
  //     <tr key={person.idPerson}>
  //       <td>{person.name}</td>
  //       <td>{person.category}</td>
  //       <td>
  //         <input type="button" value="Editar" onClick={() => btEditar(person.idPerson, actionTypes.editando)} />
  //         <input type="button" value="Excluir" onClick={() => btEditar(person.idPerson, actionTypes.excluindo)} />
  //       </td>
  //     </tr>
  //   )

  const btEditar = (idPerson: number, action: string) => {
    setMensagemState({ ...mensagemState, exibir: true, mensagem: 'Pesquisando Pessoa', tipo: MensagemTipo.Info, modal: true })
    setTimeout(() => {

      fetch(URL_SERVIDOR.concat('/person/'.concat(idPerson.toString())), {
        headers: {
          'Content-Type': 'application/json',
        },
        method: 'GET'
      }).then(rs => {
        if (rs.ok) {
          setMensagemState({ ...mensagemState, exibir: false, mensagem: '', modal: false })

          return rs.json()

        } else {
          setMensagemState({ ...mensagemState, exibir: true, mensagem: 'Erro ao pesquisa Pessoa', tipo: MensagemTipo.Info, modal: true })
        }
      }).then(rsPerson => {
        setPerson(rsPerson)
        setLocalState({ action: action })

      }).catch(() => {
        setMensagemState({ ...mensagemState, exibir: true, mensagem: 'Erro na conexão, não foi possível fazer a exclusão!', tipo: MensagemTipo.Error, modal: true })
      })

    }, TEMPO_REFRESH_TEMPORARIO)
  }



  const btIncluir = () => {
    setLocalState({ action: actionTypes.incluindo })
  }

  const btCancelar = () => {
    setLocalState({ action: actionTypes.pesquisando })
    btPesquisar()
  }

  const btConfirmarExclusao = () => {
    setMensagemState({ ...mensagemState, exibir: true, mensagem: 'Excluindo dados....', tipo: MensagemTipo.Info, modal: true })

    setTimeout(() => {

      fetch(URL_SERVIDOR.concat('/person/'.concat(person.idPerson.toString())), {
        headers: {
          'Content-Type': 'application/json',
        },
        method: 'DELETE'
      }).then(rs => {

        if (rs.ok) {

          setMensagemState({ ...mensagemState, exibir: true, mensagem: 'Pessoa excluída com sucesso', tipo: MensagemTipo.Info, modal: true })

          setPerson(ResetDados)

          setLocalState({ action: 'pesquisando' })

          btPesquisar()

        } else {

          setMensagemState({ ...mensagemState, exibir: true, mensagem: 'Erro na exclusão', tipo: MensagemTipo.Error, modal: true })

        }

      }).catch(() => {

        setMensagemState({ ...mensagemState, exibir: true, mensagem: 'Erro na conexão, não foi possível fazer a exclusão!', tipo: MensagemTipo.Error, modal: true })

      })

    }, TEMPO_REFRESH_TEMPORARIO)

  }

  const btConfirmarEdicao = () => {
    setMensagemState({ ...mensagemState, exibir: true, mensagem: 'Alterando dados....', tipo: MensagemTipo.Info, modal: true })

    setTimeout(() => {
      fetch(URL_SERVIDOR.concat('/person/'.concat(person.idPerson.toString())), {
        body: JSON.stringify(person),
        headers: {
          'Content-Type': 'application/json',
        },
        method: 'PUT'

      }).then(rs => {
        if (rs.ok) {

          setPerson(ResetDados)

          setLocalState({ action: 'pesquisando' })

          btPesquisar()

          setMensagemState({ ...mensagemState, exibir: true, mensagem: 'Dados alterados com sucesso', tipo: MensagemTipo.Info, modal: true })
        } else {
          setMensagemState({ ...mensagemState, exibir: true, mensagem: 'Erro na alteração', tipo: MensagemTipo.Error, modal: true })
        }
      }).catch(() => {
        setMensagemState({ ...mensagemState, exibir: true, mensagem: 'Erro na conexão, não foi possível fazer a alteração!', tipo: MensagemTipo.Error, modal: true })
      })
    }, TEMPO_REFRESH_TEMPORARIO)
  }

  const btConfirmarInclusao = () => {

    setMensagemState({ ...mensagemState, exibir: true, mensagem: 'Incluindo dados....', tipo: MensagemTipo.Info, modal: true })

    setTimeout(() => {
      fetch(URL_SERVIDOR.concat('/person'), {
        body: JSON.stringify(person),
        headers: {
          'Content-Type': 'application/json',
        },
        method: 'POST'
      }).then(rs => {
        if (rs.ok) {

          setPerson(ResetDados)
          setMensagemState({ ...mensagemState, exibir: true, mensagem: 'Pessoa incluída com sucesso', tipo: MensagemTipo.Info, modal: true })
        } else {
          setMensagemState({ ...mensagemState, exibir: true, mensagem: 'Erro na inclusão', tipo: MensagemTipo.Error, modal: true })
        }
      }).catch(() => {
        setMensagemState({ ...mensagemState, exibir: true, mensagem: 'Erro na conexão, não foi possível fazer a inclusão!', tipo: MensagemTipo.Error, modal: true })
      })
    }, TEMPO_REFRESH_TEMPORARIO)
  }

  const btPesquisar = () => {

    setMensagemState({ ...mensagemState, exibir: true, mensagem: 'Pesquisando ....', tipo: MensagemTipo.Info, modal: true })

    setTimeout(() => {

      fetch(URL_SERVIDOR.concat('/person?name_like='.concat(pesquisa.nome)), {
        headers: {
          'Content-Type': 'application/json',
        },
        method: 'GET'
      }).then(rs => {

        if (rs.ok) {
          setMensagemState({ ...mensagemState, exibir: false, mensagem: '', tipo: MensagemTipo.Info, modal: false })

          return rs.json()

        } else {
          setMensagemState({ ...mensagemState, exibir: true, mensagem: 'Erro ao pesquisar', tipo: MensagemTipo.Error, modal: true })
        }
      }).then((rsPerson: PersonInterface[]) => {

        setRsPesquisa(rsPerson)

      }).catch(() => {
        setMensagemState({ ...mensagemState, exibir: true, mensagem: 'Erro na conexão, não foi possível fazer a pesquisa!', tipo: MensagemTipo.Error, modal: true })
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
                  <ComText label="Pesquisa" type="text" dados={pesquisa} field="nome" setState={setPesquisa} />

                </Grid>
                <Grid item xs={12} sm={2} sx={{ textAlign: { xs: 'right', sm: 'center' } }}>
                  <IconButton type="button" sx={{ p: '10px' }} aria-label="search" onClick={() => btPesquisar()}>
                    <SearchIcon />
                  </IconButton>

                  <Button variant='contained' onClick={() => btIncluir()}>Incluir</Button>

                </Grid>
              </>
            }

            {localState.action !== 'pesquisando' &&
              <>
                <Grid item xs={12} sm={10} mt={3}>
                  <ComText label="Nome" type="text" dados={person} field="name" setState={setPerson} disabled={localState.action == 'excluindo' ? true : false} />
                </Grid>

                <Grid item xs={12} sm={10} mt={3}>
                  <Box>
                    <FormControl fullWidth>
                      <InputLabel id="demo-simple-select-label">Categoria</InputLabel>
                      <Select
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

              // <table className='clsTableEscola'>
              //   <thead>
              //     <tr>
              //       <td>Nome</td>
              //       <td>Categoria</td>
              //       <td>Ações</td>
              //     </tr>
              //   </thead>
              //   <tbody>
              //     {
              //       printTable()
              //     }
              //   </tbody>
              // </table>
              <Grid item xs={12} sx={{ mt: 3 }}>
                <DataTable
                  dados={rsPesquisa}
                  cabecalho={Cabecalho}
                  onEditar={() => btEditar(person.idPerson, actionTypes.editando)}
                  onExcluir={() => btEditar(person.idPerson, actionTypes.excluindo)}
                />
              </Grid>
            }
          </Grid>
        </Paper>
      </Container>
    </>
  )
}
