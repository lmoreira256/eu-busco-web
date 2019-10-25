import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { UtilService } from './util.service';
import { MensagensService } from './mensagens.service';

@Injectable({
  providedIn: 'root'
})
export class TipoContatoService {

  public tiposContato = [];

  constructor(
    private http: HttpClient,
    private util: UtilService,
    private mensagem: MensagensService
  ) { }

  public adquirirTodos() {
    this.http.get('tipoContatoService/adquirirTodos').toPromise().then((retorno: any) => {
      this.tiposContato = retorno;
    }).catch(() => {
      this.util.showAlertDanger(this.mensagem.FALHA_TIPO_USARIO);
    }).finally(() => this.util.requestProgress = false);
  }

}
