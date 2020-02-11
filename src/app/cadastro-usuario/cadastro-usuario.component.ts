import { Component, OnInit, ViewChild } from '@angular/core';
import { TipoUsuarioService } from '../services/tipo-usuario.service';
import { UsuarioService } from '../services/usuario.service';
import { MensagensService } from '../services/mensagens.service';
import { UtilService } from '../services/util.service';
import { Md5 } from 'md5-typescript';
import { Usuario } from '../interfaces/usuario';

@Component({
  selector: 'app-cadastro-usuario',
  templateUrl: './cadastro-usuario.component.html',
  styleUrls: ['./cadastro-usuario.component.scss']
})
export class CadastroUsuarioComponent implements OnInit {

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
    private usuarioService: UsuarioService,
    private mensagem: MensagensService,
    private util: UtilService
  ) { }

  ngOnInit() {
    this.tipoUsuarioService.adquirirTodos();
  }

  public salvar() {
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

    me.usuarioService.salvar(parametros).then((retorno: any) => {
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

  private limparCampos() {
    const me = this;

    me.campoTipoUsuario.value = 0;
    me.nome.nativeElement.value = '';
    me.senha.nativeElement.value = '';
    me.confirmarSenha.nativeElement.value = '';
    me.login.nativeElement.value = '';
  }

}
