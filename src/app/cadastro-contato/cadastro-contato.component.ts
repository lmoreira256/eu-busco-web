import { Component, OnInit, ViewChild } from '@angular/core';
import { UserService } from '../services/user.service';
import { TipoContatoService } from '../services/tipo-contato.service';
import { MensagensService } from '../services/mensagens.service';
import { UtilService } from '../services/util.service';
import { ContatoService } from '../services/contato.service';

@Component({
  selector: 'app-cadastro-contato',
  templateUrl: './cadastro-contato.component.html',
  styleUrls: ['./cadastro-contato.component.scss']
})
export class CadastroContatoComponent implements OnInit {

  public usuarios = [];

  @ViewChild('campoUsuario', { static: false })
  public campoUsuario: any;

  @ViewChild('campoTipoContato', { static: false })
  public campoTipoContato: any;

  @ViewChild('descricao', { static: false })
  public descricao: any;

  constructor(
    public userService: UserService,
    public tipoContatoService: TipoContatoService,
    private mensagem: MensagensService,
    private util: UtilService,
    private contatoService: ContatoService
  ) { }

  ngOnInit() {
    this.buscarUsuarios();
    this.tipoContatoService.adquirirTodos();
  }

  private buscarUsuarios() {
    const me = this;

    me.userService.buscarTodosUsuarios().then((retorno: any) => {
      me.usuarios = retorno;
    });
  }

  public salvar() {
    const me = this;

    const parametros = {
      codigoUsuario: me.campoUsuario.value,
      codigoTipoContato: me.campoTipoContato.value,
      descricao: me.descricao.nativeElement.value
    };

    me.contatoService.salvarContato(parametros).then((retorno: any) => {
      if (retorno) {
        me.util.showAlertSuccess(me.mensagem.SALVO_SUCESSO);
        me.limparCampos();
      } else {
        me.util.showAlertDanger(me.mensagem.FALHA_SALVAR_ENDERECO);
      }
    }).catch(() => {
      me.util.showAlertDanger(me.mensagem.FALHA_SALVAR_ENDERECO);
    }).finally(() => me.util.requestProgress = false);
  }

  private limparCampos() {
    const me = this;

    me.campoUsuario.value = 0;
    me.campoTipoContato.value = 0;
    me.descricao.nativeElement.value = '';
  }

}
