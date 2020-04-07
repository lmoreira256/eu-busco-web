import { Component, ViewChild } from '@angular/core';
import { UsuarioService } from '../services/usuario.service';
import { Md5 } from 'md5-typescript';
import { Router } from '@angular/router';
import { UtilService } from '../services/util.service';
import { MensagensService } from '../services/mensagens.service';
import { PagesService } from '../services/pages.service';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-autenticacao',
  templateUrl: './autenticacao.component.html',
  styleUrls: ['./autenticacao.component.scss']
})
export class AutenticacaoComponent {

  userForm = this.fb.group({
    username: ['', [Validators.required, Validators.minLength(3)]],
    password: ['', [Validators.required]]
  });

  constructor(
    private userSevice: UsuarioService,
    private router: Router,
    private util: UtilService,
    private mensagem: MensagensService,
    private pages: PagesService,
    private fb: FormBuilder
  ) { }

  onKeydown(event: any) {
    if (event.key === 'Enter' && this.userForm.valid) {
      this.login();
    }
  }

  login() {
    const me = this;

    const parametros = {
      login: me.userForm.value.username,
      senha: Md5.init(me.userForm.value.password)
    };

    me.userSevice.realizarLogin(parametros).then((obj: any) => {
      me.userSevice.usuarioLogado = obj.logado;
      me.userSevice.idUsuario = obj.idUsuario;
      me.userSevice.tipoUsuario = obj.tipoUsuario;
      me.userSevice.nomeUsuario = obj.nomeUsuario;

      if (obj.logado) {
        me.router.navigate([me.pages.DASHBOARD]);
      } else {
        me.util.showAlertDanger(me.mensagem.SENHA_INVALIDA);
      }
    }).catch(() => {
      me.util.showAlertDanger(me.mensagem.FALHA_LOGIN);
    }).finally(() => this.util.requestProgress = false);
  }

}
