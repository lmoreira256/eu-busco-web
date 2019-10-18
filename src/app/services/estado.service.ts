import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { UtilService } from './util.service';
import { MensagensService } from './mensagens.service';

@Injectable({
  providedIn: 'root'
})
export class EstadoService {

  public estados = [];

  constructor(
    private http: HttpClient,
    private util: UtilService,
    private mensagem: MensagensService
  ) { }

  public adquirirTodos() {
    this.http.get('cidadeService/adquirirTodos').toPromise().then((retorno: any) => {
      this.estados = retorno;
    }).catch(() => {
      this.util.showAlertDanger(this.mensagem.FALHA_ESTADO);
    }).finally(() => this.util.requestProgress = false);
  }

}
