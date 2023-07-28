import React from "react";
import { URL_SERVIDOR } from '../Config/Setup';
import { MensagemStateInterface, MensagemTipo } from '../Context/MensagemState';
import { ActionInterface, actionTypes } from '../interfaces/ActionInterface';

export enum MetodoTipo {
    GET = 'GET',
    DELETE = 'DELETE',
    POST = "POST",
    PUT = 'PUT'
}
export default class ApiCls {


    public query<T>(
        url: string,
        //body?: { [key: string]: number | string },
        mensagem: string,
        mensagemState: MensagemStateInterface,
        setMensagemState: React.Dispatch<React.SetStateAction<MensagemStateInterface>>,
        metodo: ActionInterface
    ): Promise<T> {

        setMensagemState({
            ...mensagemState,
            titulo: 'Processando...',
            mensagem: mensagem,
            exibir: true,
            tipo: MensagemTipo.Loading,
            exibirBotao: false,
            cb: null
        })

        var method: string = ''

        if (metodo.action === actionTypes.pesquisando) {
            method = MetodoTipo.GET
        } else if (metodo.action === actionTypes.excluindo) {
            method = MetodoTipo.DELETE
        } else if (metodo.action === actionTypes.incluindo) {
            method = MetodoTipo.POST
        } else {
            method = MetodoTipo.PUT
        }
        let headers = new Headers()

        headers.set('Content-Type', 'application/json')

        const parametros: RequestInit = {
            method: method,
            headers: headers,
            //body: JSON.stringify(body)
        }

        return fetch(URL_SERVIDOR.concat(url), parametros).then(rs => {
            return rs.json() as Promise<T>
        })
    }
}