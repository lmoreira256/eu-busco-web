import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { UsuarioService } from './usuario.service';
import { UtilService } from './util.service';
import { PaginacaoDTO } from '../interfaces/paginacao-dto';

@Injectable({
  providedIn: 'root'
})
export class EntregaService {

  abertas: PaginacaoDTO;
  andamento: PaginacaoDTO;
  finalizadas: PaginacaoDTO;
  excluidas: PaginacaoDTO;

  paginaEntregasAbertas = 1;

  constructor(
    private http: HttpClient,
    private usuarioService: UsuarioService,
    private util: UtilService
  ) { }

  salvar(parametros: any) {
    return this.http.post('entregaService/salvar', parametros).toPromise();
  }

  pegarEntrega(parametros: any) {
    return this.http.post('entregaService/pegarEntrega', parametros).toPromise().finally(() => this.util.requestProgress = false);
  }

  largarEntrega(parametros: any) {
    return this.http.post('entregaService/largarEntrega', parametros).toPromise().finally(() => this.util.requestProgress = false);
  }

  excluirEntrega(parametros: any) {
    return this.http.post('entregaService/excluirEntrega', parametros).toPromise().finally(() => this.util.requestProgress = false);
  }

  finalizarEntrega(parametros: any) {
    return this.http.post('entregaService/finalizarEntrega', parametros).toPromise().finally(() => this.util.requestProgress = false);
  }

  buscarEntregasAbertas(pagina: number) {
    const parametros = '?codigoUsuario=' + this.usuarioService.codigoUsuario
      + '&tipoUsuario=' + this.usuarioService.tipoUsuario
      + '&pagina=' + pagina;

    return this.http.get('entregaService/buscarEntregasAbertas' + parametros).toPromise().finally(() => this.util.requestProgress = false);
  }

}
