import { Component, OnInit, ViewChild } from '@angular/core';
import { TipoUsuarioService } from '../services/tipo-usuario.service';
import { UserService } from '../services/user.service';
import { MensagensService } from '../services/mensagens.service';
import { UtilService } from '../services/util.service';
import { Md5 } from 'md5-typescript';
import { Usuario } from '../interfaces/usuario';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-cadastro-usuario',
  templateUrl: './cadastro-usuario.component.html',
  styleUrls: ['./cadastro-usuario.component.scss']
})
export class CadastroUsuarioComponent implements OnInit {

  userForm = this.fb.group({
    code: ['', [Validators.required, Validators.minLength(4)]]
  });

  public usuario: Usuario = {
    codigo: null,
    tipoUsuario: null
  };

  @ViewChild('campoTipoUsuario', { static: false })
  public campoTipoUsuario: any;

  @ViewChild('nome', { static: false })
  public nome: any;

  @ViewChild('login', { static: false })
  public login: any;

  @ViewChild('senha', { static: false })
  public senha: any;

  @ViewChild('confirmarSenha', { static: false })
  public confirmarSenha: any;

  constructor(
    public tipoUsuarioService: TipoUsuarioService,
    private userService: UserService,
    private mensagem: MensagensService,
    private util: UtilService,
    private fb: FormBuilder
  ) { }

  ngOnInit() {
    this.tipoUsuarioService.adquirirTodos();
    this.adicionarOuvinteBotao();
  }

  adicionarOuvinteBotao() {
    this.userForm.get('code').valueChanges.subscribe((newValue: string) => {

      console.log(newValue);
    });
  }

  public onSubmit() {
    const me = this;

    const senha = me.senha.nativeElement.value;
    const confirmarSenha = me.confirmarSenha.nativeElement.value;

    if (senha !== confirmarSenha) {
      me.util.showAlertDanger(me.mensagem.SENHAS_DIFERENTES);
      return;
    }

    const parametros = {
      tipoUsuario: me.campoTipoUsuario.value,
      nomeUsuario: me.nome.nativeElement.value,
      senhaUsuario: Md5.init(me.senha.nativeElement.value),
      loginUsuario: me.login.nativeElement.value
    };

    me.userService.salvar(parametros).then((retorno: any) => {
      if (retorno) {
        me.util.showAlertSuccess(me.mensagem.SALVO_SUCESSO);
        me.limparCampos();
      } else {
        me.util.showAlertDanger(me.mensagem.FALHA_SALVAR_USUARIO);
      }
    }).catch(() => {
      me.util.showAlertDanger(me.mensagem.FALHA_SALVAR_USUARIO);
    }).finally(() => me.util.requestProgress = false);
  }

  public inputCodeChange(value: any) {
    console.log(value);
    console.log(this.usuario);
  }

  public teste(event) {
    return /[0-9]+/.test(event.key);
  }

  private limparCampos() {
    const me = this;

    me.campoTipoUsuario.value = 0;
    me.nome.nativeElement.value = '';
    me.senha.nativeElement.value = '';
    me.confirmarSenha.nativeElement.value = '';
    me.login.nativeElement.value = '';
  }

}
