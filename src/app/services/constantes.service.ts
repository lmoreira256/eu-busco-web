import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ConstantesService {

  public urlServidor = 'http://localhost:8080/';
  public desenvolvimento = true;

  constructor() { }

}
