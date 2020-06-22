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
  public nota: number;

  constructor(
    private http: HttpClient
  ) { }

  public efetuarLogin(parametros: any) {
    return this.http.post('usuarioService/efetuarLogin', parametros).toPromise();
  }

  public salvar(parametros: any) {
    return this.http.post('userService/novoUsuario', parametros).toPromise();
  }

  public buscarTodosUsuarios() {
    return this.http.get('userService/buscarTodosUsuarios').toPromise();
  }

}
