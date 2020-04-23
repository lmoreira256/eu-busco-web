import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  public usuarioLogado = false;
  public codigoUsuario: number;
  public tipoUsuario: number;
  public nomeUsuario: string;
  public dadosUsuario = {
    nota: '-',
    entregasAbertas: '-',
    totalEntregas: '-'
  };

  constructor(
    private http: HttpClient
  ) { }

  public efetuarLogin(parametros: any) {
    return this.http.post('usuarioService/efetuarLogin', parametros).toPromise();
  }

  public salvar(parametros: any) {
    return this.http.post('usuarioService/novoUsuario', parametros).toPromise();
  }

  public buscarTodosUsuarios() {
    return this.http.get('usuarioService/buscarTodosUsuarios').toPromise();
  }

}
