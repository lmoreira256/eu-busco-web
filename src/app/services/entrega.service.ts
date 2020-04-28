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

  public abertas: PaginacaoDTO;
  public andamento: PaginacaoDTO;
  public finalizadas: PaginacaoDTO;
  public excluidas: PaginacaoDTO;

  constructor(
    private http: HttpClient,
    private usuarioService: UsuarioService,
    private util: UtilService,
    private mensagem: MensagensService
  ) { }

  public salvar(parametros: any) {
    return this.http.post('entregaService/salvar', parametros).toPromise();
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

  public finalizarEntrega(parametros: any) {
    return this.http.post('entregaService/finalizarEntrega', parametros).toPromise().finally(() => this.util.requestProgress = false);
  }

}
