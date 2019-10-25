import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ContatoService {

  constructor(
    private http: HttpClient
  ) { }

  public salvarContato(parametros: any) {
    return this.http.post('contatoService/salvarContato', parametros).toPromise();
  }

}
