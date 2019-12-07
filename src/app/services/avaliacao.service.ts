import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AvaliacaoService {

  constructor(
    private http: HttpClient
  ) { }

  public salvar(parametros: any) {
    return this.http.post('avaliacaoService/salvar', parametros).toPromise();
  }

}
