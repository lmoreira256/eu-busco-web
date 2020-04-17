import { Component, ViewChild } from '@angular/core';
import { UsuarioService } from '../services/usuario.service';
import { Md5 } from 'md5-typescript';
import { Router } from '@angular/router';
import { UtilService } from '../services/util.service';
import { MensagensService } from '../services/mensagens.service';
import { PagesService } from '../services/pages.service';

@Component({
  selector: 'app-autenticacao',
  templateUrl: './autenticacao.component.html',
  styleUrls: ['./autenticacao.component.scss']
})
export class AutenticacaoComponent {

  @ViewChild('login', { static: false })
  public login: any;

  @ViewChild('senha', { static: false })
  public senha: any;

  constructor(
    private usuarioService: UsuarioService,
    private router: Router,
    private util: UtilService,
    private mensagem: MensagensService,
    private pages: PagesService
  ) { }

  public entrar() {
    const me = this;

    const parametros = {
      login: me.login.nativeElement.value,
      senha: Md5.init(me.senha.nativeElement.value)
    };

    me.usuarioService.realizarLogin(parametros).then((retorno: any) => {
      me.usuarioService.usuarioLogado = retorno.success;
      me.usuarioService.idUsuario = retorno.userCode;
      me.usuarioService.tipoUsuario = retorno.userType;
      me.usuarioService.nomeUsuario = retorno.userName;

      if (retorno.success) {
        me.router.navigate([me.pages.DASHBOARD]);
      } else {
        me.util.showAlertDanger(me.mensagem.SENHA_INVALIDA);
      }
    }).catch(() => {
      me.util.showAlertDanger(me.mensagem.FALHA_LOGIN);
    }).finally(() => this.util.requestProgress = false);
  }

  public onKeydown(event: any) {
    if (event.key === 'Enter') {
      this.entrar();
    }
  }

}
