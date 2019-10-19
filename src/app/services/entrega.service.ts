import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { UsuarioService } from './usuario.service';
import { UtilService } from './util.service';
import { MensagensService } from './mensagens.service';

@Injectable({
  providedIn: 'root'
})
export class EntregaService {

  public entregasAbertas = [];

  constructor(
    private http: HttpClient,
    private usuarioService: UsuarioService,
    private util: UtilService,
    private mensagem: MensagensService
  ) { }

  public salvar(parametros: any) {
    return this.http.post('entregaService/salvar', parametros).toPromise();
  }

  public buscarAbertasCliente() {
    this.http.get('entregaService/buscarAbertasCliente?idUsuario=' + this.usuarioService.idUsuario).toPromise().then((retorno: any) => {
      this.entregasAbertas = retorno;
    }).catch(() => {
      this.util.showAlertDanger(this.mensagem.FALHA_ENTREGA);
    }).finally(() => this.util.requestProgress = false);
  }

  public buscarAbertasEntregador() {
    this.http.get('entregaService/buscarAbertasEntregador?idUsuario=' + this.usuarioService.idUsuario).toPromise().then((retorno: any) => {
      this.entregasAbertas = retorno;
    }).catch(() => {
      this.util.showAlertDanger(this.mensagem.FALHA_ENTREGA);
    }).finally(() => this.util.requestProgress = false);
  }

  public buscarDisponiveis() {
    this.http.get('entregaService/buscarDisponiveis').toPromise().then((retorno: any) => {
      this.entregasAbertas = retorno;
    }).catch(() => {
      this.util.showAlertDanger(this.mensagem.FALHA_ENTREGA);
    }).finally(() => this.util.requestProgress = false);
  }

}
