import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { UsuarioService } from './usuario.service';
import { UtilService } from './util.service';
import { MensagensService } from './mensagens.service';

@Injectable({
  providedIn: 'root'
})
export class EnderecoService {

  public enderecosUsuario = [];

  constructor(
    private http: HttpClient,
    private usuarioService: UsuarioService,
    private util: UtilService,
    private mensagem: MensagensService
  ) { }

  public salvar(parametros: any) {
    return this.http.post('enderecoService/salvar', parametros).toPromise();
  }

  public adquirirTodosUsuario() {
    this.http.get('enderecoService/adquirirTodosUsuario?idUsuario=' + this.usuarioService.codigoUsuario).toPromise()
      .then((retorno: any) => {
        this.enderecosUsuario = retorno;
      }).catch(() => {
        this.util.showAlertDanger(this.mensagem.FALHA_ENDERECO);
      }).finally(() => this.util.requestProgress = false);
  }

}
