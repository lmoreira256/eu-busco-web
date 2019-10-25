import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PagesService {

  public DASHBOARD = '/dashboard';
  public CADASTRO_ENTREGA = '/cadastro-entrega';
  public CADASTRO_ENDERECO = '/cadastro-endereco';
  public CADASTRO_USUARIO = '/cadastro-usuario';
  public CADASTRO_CIDADE = '/cadastro-cidade';
  public ENTREGAS = '/entregas';
  public CADASTRO_CONTATO = '/cadastro-contato';

}
