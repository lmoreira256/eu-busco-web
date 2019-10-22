import { Injectable } from '@angular/core';
import { DatePipe } from '@angular/common';

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
    public datepipe: DatePipe
  ) { }

  public showAlertDanger(mensage: string) {
    const me = this;

    if (!me.alertDanger) {
      me.alertDanger = true;
      me.mensageAlertDanger = mensage;

      setTimeout(() => {
        me.alertDanger = false;
      }, 1500);
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
      }, 1500);
    } else {
      setTimeout(() => {
        me.showAlertSuccess(mensage);
      }, 500);
    }
  }

  public isNullOrEmpy(obj: any) {
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

}
