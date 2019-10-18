import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler } from '@angular/common/http';
import { UtilService } from './util.service';
import { ConstantesService } from './constantes.service';

@Injectable({
  providedIn: 'root'
})
export class InterceptadorService implements HttpInterceptor {

  constructor(
    private util: UtilService,
    private constantes: ConstantesService
  ) { }

  intercept(request: HttpRequest<any>, next: HttpHandler) {
    this.util.requestProgress = true;

    request = request.clone({ url: this.constantes.urlServidor + request.url });

    request = request.clone({ headers: request.headers.set('Content-Type', 'application/json') });
    request = request.clone({ headers: request.headers.set('Accept', 'application/json') });
    request = request.clone({ headers: request.headers.set('Access-Control-Allow-Origin', '*') });

    return next.handle(request);
  }

}
