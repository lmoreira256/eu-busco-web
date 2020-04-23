import { Component, ViewChild } from '@angular/core';
import { UsuarioService } from '../services/usuario.service';
import { Md5 } from 'md5-typescript';
import { Router } from '@angular/router';
import { UtilService } from '../services/util.service';
import { MensagensService } from '../services/mensagens.service';
import { PagesService } from '../services/pages.service';
import { FormBuilder, Validators } from '@angular/forms';
import { RetornoEfetuarLoginDTO } from '../interfaces/retorno-efetuar-login-dto';
import { EntregaService } from '../services/entrega.service';

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
    private usuarioService: UsuarioService,
    private entregaService: EntregaService,
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

    me.usuarioService.efetuarLogin(parametros).then((retornoEfetuarLoginDTO: RetornoEfetuarLoginDTO) => {
      me.usuarioService.codigoUsuario = retornoEfetuarLoginDTO.codigoUsuario;
      me.usuarioService.tipoUsuario = retornoEfetuarLoginDTO.tipoUsuario;
      me.usuarioService.nomeUsuario = retornoEfetuarLoginDTO.nomeUsuario;

      me.entregaService.entregasAbertas = retornoEfetuarLoginDTO.entregasAbertas;
      me.entregaService.entregasFinalizadas = retornoEfetuarLoginDTO.entregasFinalizadas;
      me.entregaService.entregasUsuarioAbertas = retornoEfetuarLoginDTO.entregasUsuarioAbertas;
      me.entregaService.entregasUsuarioAndamento = retornoEfetuarLoginDTO.entregasUsuarioAndamento;

      me.router.navigate([me.pages.DASHBOARD]);
    }).catch(() => {
      me.util.showAlertDanger(me.mensagem.FALHA_LOGIN);
    }).finally(() => this.util.requestProgress = false);
  }

}
