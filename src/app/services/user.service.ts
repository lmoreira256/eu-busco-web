import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UserService {

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
    return this.http.post('userService/login', parametros).toPromise();
  }

  public buscarDadosUsuario() {
    return this.http.get('userService/buscarDadosUsuario?idUsuario=' + this.idUsuario).toPromise();
  }

  public salvar(parametros: any) {
    return this.http.post('userService/novoUsuario', parametros).toPromise();
  }

  public buscarTodosUsuarios() {
    return this.http.get('userService/buscarTodosUsuarios').toPromise();
  }

}
