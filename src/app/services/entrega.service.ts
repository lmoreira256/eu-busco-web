import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { UsuarioService } from './usuario.service';
import { UtilService } from './util.service';
import { MensagensService } from './mensagens.service';
import { PaginacaoDTO } from '../interfaces/paginacao-dto';

@Injectable({
  providedIn: 'root'
})
export class EntregaService {

  public entregasUsuarioAbertas: PaginacaoDTO;
  public entregasUsuarioAndamento: PaginacaoDTO;
  public entregasAbertas: PaginacaoDTO;
  public entregasFinalizadas: PaginacaoDTO;

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
    this.http.get('entregaService/buscarAbertasCliente?idUsuario=' + this.usuarioService.codigoUsuario).toPromise().then((retorno: any) => {
      this.entregasAbertas = retorno;
    }).catch(() => {
      this.util.showAlertDanger(this.mensagem.FALHA_ENTREGA);
    }).finally(() => this.util.requestProgress = false);
  }

  public buscarAbertasEntregador() {
    this.http.get('entregaService/buscarAbertasEntregador?idUsuario=' + this.usuarioService.codigoUsuario)
      .toPromise().then((retorno: any) => {
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

  public pegarEntrega(parametros: any) {
    return this.http.post('entregaService/pegarEntrega', parametros).toPromise().finally(() => this.util.requestProgress = false);
  }

  public largarEntrega(parametros: any) {
    return this.http.post('entregaService/largarEntrega', parametros).toPromise().finally(() => this.util.requestProgress = false);
  }

  public excluirEntrega(parametros: any) {
    return this.http.post('entregaService/excluirEntrega', parametros).toPromise().finally(() => this.util.requestProgress = false);
  }

  public buscarTodasAbertas() {
    this.http.get('entregaService/buscarTodasAbertas').toPromise().then((retorno: any) => {
      this.entregasAbertas = retorno;
    }).catch(() => {
      this.util.showAlertDanger(this.mensagem.FALHA_ENTREGA);
    }).finally(() => this.util.requestProgress = false);
  }

  public finalizarEntrega(parametros: any) {
    return this.http.post('entregaService/finalizarEntrega', parametros).toPromise().finally(() => this.util.requestProgress = false);
  }

  public buscarEntregasAvaliacao() {
    this.http.get('entregaService/buscarEntregasAvaliacao?codigoUsuario=' + this.usuarioService.codigoUsuario)
      .toPromise().then((retorno: any) => {
        this.entregasAbertas = retorno;
      }).catch(() => {
        this.util.showAlertDanger(this.mensagem.FALHA_ENTREGA);
      }).finally(() => this.util.requestProgress = false);
  }

}
