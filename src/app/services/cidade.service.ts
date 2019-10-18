import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { UtilService } from './util.service';
import { MensagensService } from './mensagens.service';

@Injectable({
  providedIn: 'root'
})
export class CidadeService {

  public cidades = [];

  constructor(
    private http: HttpClient,
    private util: UtilService,
    private mensagem: MensagensService
  ) { }

  public adquirirTodos() {
    this.http.get('cidadeService/adquirirTodos').toPromise().then((retorno: any) => {
      this.cidades = retorno;
    }).catch(() => {
      this.util.showAlertDanger(this.mensagem.FALHA_CIDADE);
    }).finally(() => this.util.requestProgress = false);
  }

  public salvar(parametros: any) {
    return this.http.post('cidadeService/salvar', parametros).toPromise();
  }

}
