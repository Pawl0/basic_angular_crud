import { Component, OnInit } from '@angular/core';

import { Router } from '@angular/router';

import { PessoaService } from '../../services/pessoa.service';

import { Pessoa } from '../../services/pessoa';

import { Response } from '../../services/response';

@Component({
  selector: 'app-consulta-pessoa',
  templateUrl: './consulta.component.html',
  styleUrls: ["./consulta.component.css"]
})
export class ConsultaComponent implements OnInit {

  private pessoas = new Array();
  private titulo: string;

  constructor(private pessoaService: PessoaService,
    private router: Router) { }

  ngOnInit() {

    /*SETA O TÍTULO */
    this.titulo = "Registros Cadastrados";

    /*CHAMA O SERVIÇO E RETORNA TODAS AS PESSOAS CADASTRADAS */
    this.pessoaService.getPessoas().subscribe(res => {
      this.pessoas = <Array<any>>res;
    }, error => console.log("Ocorreu um erro: ", error));

  }

  /**EXCLUI UM REGISTRO QUANDO CLICAMOS NA OPÇÃO EXCLUIR DE UMA 
   * LINHA DA TABELA*/
  excluir(codigo: number, index: number): void {

    if (confirm("Deseja realmente excluir esse registro?")) {

      /*CHAMA O SERVIÇO PARA REALIZAR A EXCLUSÃO */
      this.pessoaService.excluirPessoa(codigo).subscribe(response => {

        console.log("response de exlusão: ", response);
        debugger;
        /**PEGA O RESPONSE DO SERVIÇO */
        let res: Response = <Response>response;
        debugger;
        /*1 = SUCESSO
        * MOSTRAMOS A MENSAGEM RETORNADA PELO SERVIÇO E DEPOIS REMOVEMOS
        O REGISTRO DA TABELA HTML*/
        if (res.codigo === 1) {
          debugger;
          alert(res.mensagem);
          this.pessoas.splice(index, 1);
        }
        else {
          /*0 = EXCEPTION GERADA NO SERVIÇO JAVA */
          alert(res.mensagem);
        }
      },
        (erro) => {
          /*MOSTRA ERROS NÃO TRATADOS */
          console.log("erro exclusão: ", erro);
          debugger;
          alert(erro);
        });
    }

  }

  editar(codigo: number): void {

    this.router.navigate(['/cadastro-pessoa', codigo]);

  }

}
