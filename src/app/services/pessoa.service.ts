import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Headers } from '@angular/http';
import { RequestOptions } from '@angular/http';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/catch';
import { Observable } from 'rxjs/Rx';

import { Pessoa } from '../services/pessoa';
import { ConfigService } from './config.service';

@Injectable()
export class PessoaService {

    private baseUrlService: string = '';
    private headers: HttpHeaders;
    private options: any;

    constructor(private http: HttpClient,
        private configService: ConfigService) {

        /**SETANDO A URL DO SERVIÇO REST QUE VAI SER ACESSADO */
        this.baseUrlService = configService.getUrlService() + '/pessoa';

        /*ADICIONANDO O JSON NO HEADER */
        this.headers = new HttpHeaders({ 'Content-Type': 'application/json;charset=UTF-8' });
        this.options = { headers: this.headers };
    }

    /**CONSULTA TODAS AS PESSOAS CADASTRADAS */
    getPessoas() {
        return this.http.get(this.baseUrlService);
    }

    /**ADICIONA UMA NOVA PESSOA */
    addPessoa(pessoa: Pessoa): Observable<any> {
        return this.http.post(this.baseUrlService, JSON.stringify(pessoa), this.options);
    }
    /**EXCLUI UMA PESSOA */
    excluirPessoa(codigo: number) {
        console.log("url delete: ", this.baseUrlService + codigo);
        debugger;
        return this.http.delete(this.baseUrlService + codigo);
    }

    /**CONSULTA UMA PESSOA PELO CÓDIGO */
    getPessoa(codigo: number) {

        return this.http.get(`${this.baseUrlService}/${codigo}`);
    }

    /**ATUALIZA INFORMAÇÕES DA PESSOA */
    atualizarPessoa(pessoa: Pessoa): Observable<any> {
        const id = pessoa._id;
        delete pessoa["_id"];
        const jsonToSave = JSON.stringify(pessoa);
        console.log("pessoa para atualizar: ", pessoa);
        console.log("pessoa stringificada para atualizar: ", jsonToSave);
        console.log("url edit: ", this.baseUrlService + id);
        debugger;
        return this.http.put(`${this.baseUrlService}/${id}`, jsonToSave, this.options);
    }

}