import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ConstantesService {

  public urlServidor = 'https://eu-busco-server.herokuapp.com/';
  // public urlServidor = 'http://localhost:8080/';
  public desenvolvimento = true;

  constructor() { }

}
