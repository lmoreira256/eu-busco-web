import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  public usuarioLogado = false;
  public idUsuario: number;
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

  public realizarLogin(parametros: any) {
    return this.http.post('usuarioService/realizarLogin', parametros).toPromise();
  }

  public buscarDadosUsuario() {
    return this.http.get('usuarioService/buscarDadosUsuario?idUsuario=' + this.idUsuario).toPromise();
  }

  public salvar(parametros: any) {
    return this.http.post('usuarioService/novoUsuario', parametros).toPromise();
  }

  public buscarTodosUsuarios() {
    return this.http.get('usuarioService/buscarTodosUsuarios').toPromise();
  }

}
