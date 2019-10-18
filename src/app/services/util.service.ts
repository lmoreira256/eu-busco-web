import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UtilService {

  public requestProgress = false;
  public alertDanger = false;
  public mensageAlertDanger: string;
  public alertSuccess = false;
  public mensageAlertSuccess: string;

  constructor() { }

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

}
