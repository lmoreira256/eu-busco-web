import { Component, ViewChild } from '@angular/core';
import { UserService } from '../services/user.service';
import { Md5 } from 'md5-typescript';
import { Router } from '@angular/router';
import { UtilService } from '../services/util.service';
import { MensagensService } from '../services/mensagens.service';
import { PagesService } from '../services/pages.service';
import { FormBuilder, Validators } from '@angular/forms';
import { DeliveryService } from '../services/delivery.service';
import { ReturnLoginDTO } from '../interfaces/return-login-dto';

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
    private userSevice: UserService,
    private router: Router,
    private util: UtilService,
    private mensagem: MensagensService,
    private pages: PagesService,
    private fb: FormBuilder,
    private deliveryService: DeliveryService
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

    me.userSevice.realizarLogin(parametros).then((obj: ReturnLoginDTO) => {
      me.userSevice.idUsuario = obj.userCode;
      me.userSevice.tipoUsuario = obj.userType;
      me.userSevice.userName = obj.userName;

      me.deliveryService.deliveriesToUser = obj.deliveriesToUser;

      me.router.navigate([me.pages.DASHBOARD]);
    }).catch(() => {
      me.util.showAlertDanger(me.mensagem.FALHA_LOGIN);
    }).finally(() => this.util.requestProgress = false);
  }

}
