import React from 'react'
import { createBrowserRouter } from 'react-router-dom';
import Home from '../Home/Home';
import ErroAplicacao from '../Layout/ErroAplicacao';
import { Clientes } from '../views/Clientes/Clientes';
import { Fornecedores } from '../views/Fornecedores/Fornecedores';
import ErroNavegacao from '../Layout/ErroNavegacao';
import Layout from '../Layout/Layout';

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    errorElement: <ErroAplicacao />,
    children: [
      {
        path: "Clientes",
        element: <Clientes />,
        errorElement: <ErroAplicacao />
      },
      {
        path: "Fornecedores",
        element: <Fornecedores />,
        errorElement: <ErroAplicacao />
      }
    ],
  },
  {
    path: "*",
    element: <ErroNavegacao />
  },
  {

    path: "*",
    element: <Home />
  }

  /*
  {
    path: "/",
    element: <LayOut />,
    errorElement: <ErroAplicacao />,
    children: [
      {
        path: "cadastrocliente/:idCliente",
        element: <CadastroCliente />,
        errorElement: <ErroAplicacao />
      },
      {
        path: "cadastrofornecedor",
        element: <CadastroFornecedor />,
        errorElement: <ErroAplicacao />
      }
    ],
  },
  {
    path: "*",
    element: <ErroNavegacao />
  }
  */
]);