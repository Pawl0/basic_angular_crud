import { Component, OnInit } from '@angular/core';

import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';

import { PessoaService } from '../../services/pessoa.service';

import { Pessoa } from '../../services/pessoa';

import { Response } from '../../services/response';

import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'app-cadastro-pessoa',
  templateUrl: './cadastro.component.html',
  styleUrls: ["./cadastro.component.css"]
})
export class CadastroComponent implements OnInit {

  private titulo: string;
  private pessoa = new Pessoa();
  private parcelas = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];

  constructor(private pessoaService: PessoaService,
    private router: Router,
    private activatedRoute: ActivatedRoute) { }

  /*CARREGADO NA INICIALIZAÇÃO DO COMPONENTE */
  ngOnInit() {

    this.activatedRoute.params.subscribe(parametro => {

      if (parametro["codigo"] === undefined) {

        this.titulo = "Novo Cadastro de Pessoa";
      }
      else {
        this.titulo = "Editar Cadastro de Pessoa";
        this.pessoaService.getPessoa(parametro["codigo"]).subscribe(res => this.pessoa = <Pessoa>res);
      }


    });
  }

  getRisco() {
    if (this.pessoa.rendimento <= 2000) {
      this.pessoa.risco = 'C';
    } else if ((this.pessoa.rendimento > 2000) && (this.pessoa.rendimento <= 8000)) {
      this.pessoa.risco = 'B';
    } else {
      this.pessoa.risco = 'A';
    }
  }

  calcularEmprestimo() {
    console.log("Calculando emprestimo a partir de: R$ ", this.pessoa.emprestimo_solicitado);
    this.pessoa.emprestimo_disponivel = this.pessoa.emprestimo_solicitado / this.pessoa.parcelas;
  }

  adicionarPessoa() {
    /*CHAMA O SERVIÇO PARA ADICIONAR UMA NOVA PESSOA */
    this.pessoaService.addPessoa(this.pessoa).subscribe(response => {

      //PEGA O RESPONSE DO RETORNO DO SERVIÇO
      let res: Response = <Response>response;
      /*SE RETORNOU 1 DEVEMOS MOSTRAR A MENSAGEM DE SUCESSO
      E LIMPAR O FORMULÁRIO PARA INSERIR UM NOVO REGISTRO*/
      if (res !== undefined) {
        alert("Pessoa salva com sucesso!");
      } else {
        /*
        ESSA MENSAGEM VAI SER MOSTRADA CASO OCORRA ALGUMA EXCEPTION
        NO SERVIDOR (CODIGO = 0)*/
        alert("Ocorreu um erro: " + res.mensagem);
      }
    },
      (erro) => {
        console.log("Ocorreu um erro: ", erro);
        /**AQUI VAMOS MOSTRAR OS ERROS NÃO TRATADOS
          EXEMPLO: SE APLICAÇÃO NÃO CONSEGUIR FAZER UMA REQUEST NA API                        */
        alert(erro);
      });
  }

  editarPessoa() {
    /*AQUI VAMOS ATUALIZAR AS INFORMAÇÕES DE UM REGISTRO EXISTENTE */
    this.pessoaService.atualizarPessoa(this.pessoa).subscribe(response => {

      //PEGA O RESPONSE DO RETORNO DO SERVIÇO
      let res: Response = <Response>response;
      debugger;
      /*SE RETORNOU 1 DEVEMOS MOSTRAR A MENSAGEM DE SUCESSO
        E REDIRECIONAR O USUÁRIO PARA A PÁGINA DE CONSULTA*/
      if (res !== undefined) {
        debugger;
        alert(res);
        this.router.navigate(['/consulta-pessoa']);
      }
      else {
        console.log("Exceção no servidor: ", res.mensagem);
        debugger;
        /*ESSA MENSAGEM VAI SER MOSTRADA CASO OCORRA ALGUMA EXCEPTION
        NO SERVIDOR (CODIGO = 0)*/
        alert(res.mensagem);
      }
    }, erro => {
      console.log("Erros não tratados: ", erro);
      debugger;
      /**AQUI VAMOS MOSTRAR OS ERROS NÃO TRATADOS
       EXEMPLO: SE APLICAÇÃO NÃO CONSEGUIR FAZER UMA REQUEST NA API                        */
      alert(erro);
    });
  }


  /*FUNÇÃO PARA SALVAR UM NOVO REGISTRO OU ALTERAÇÃO EM UM REGISTRO EXISTENTE */
  salvar(): void {
    /*SE NÃO TIVER CÓDIGO VAMOS INSERIR UM NOVO REGISTRO */
    if (this.pessoa._id === undefined) {
      this.adicionarPessoa();
    } else {
      this.editarPessoa();
    }

  }

}
