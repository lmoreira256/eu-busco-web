import { Injectable } from '@angular/core';
import { DatePipe } from '@angular/common';
import { Router } from '@angular/router';
import { UsuarioService } from './usuario.service';

@Injectable({
  providedIn: 'root'
})
export class UtilService {

  public requestProgress = false;
  public alertDanger = false;
  public mensageAlertDanger: string;
  public alertSuccess = false;
  public mensageAlertSuccess: string;
  public tamanhoTela = window.innerWidth;

  constructor(
    public datepipe: DatePipe,
    private router: Router,
    private usuarioService: UsuarioService
  ) { }

  public showAlertDanger(mensage: string) {
    const me = this;

    if (!me.alertDanger) {
      me.alertDanger = true;
      me.mensageAlertDanger = mensage;

      setTimeout(() => {
        me.alertDanger = false;
      }, 2000);
    } else {
      setTimeout(() => {
        me.showAlertDanger(mensage);
      }, 500);
    }
  }

  public showAlertSuccess(mensage: string) {
    const me = this;

    if (!me.alertSuccess) {
      me.alertSuccess = true;
      me.mensageAlertSuccess = mensage;

      setTimeout(() => {
        me.alertSuccess = false;
      }, 2000);
    } else {
      setTimeout(() => {
        me.showAlertSuccess(mensage);
      }, 500);
    }
  }

  public isNullOrEmpty(obj: any) {
    return obj === null || obj === undefined;
  }

  public formatarData(data: string) {
    return this.datepipe.transform(data, 'dd/MM/yyyy');
  }

  public calcularTamanhoGrid() {
    if (this.tamanhoTela <= 1800 && this.tamanhoTela >= 1300) {
      return 2;
    } else if (this.tamanhoTela < 1300) {
      return 1;
    }

    return 3;
  }

  public calcularRowHeightGrid() {
    if (this.tamanhoTela <= 500) {
      return '1:1';
    }

    return '2:1';
  }

  public openProgram(program: string) {
    this.router.navigate([program]);
  }

  logOff() {
    const me = this;

    me.usuarioService.usuarioLogado = false;
    me.router.navigate(['']);
  }

}
