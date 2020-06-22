import { Component, OnInit, ViewChild } from '@angular/core';
import { UsuarioService } from 'src/app/services/usuario.service';
import { EntregaService } from 'src/app/services/entrega.service';
import { AvaliacaoService } from 'src/app/services/avaliacao.service';
import { MensagensService } from 'src/app/services/mensagens.service';
import { UtilService } from 'src/app/services/util.service';

@Component({
  selector: 'app-cadastro-avaliacao',
  templateUrl: './cadastro-avaliacao.component.html',
  styleUrls: ['./cadastro-avaliacao.component.scss']
})
export class CadastroAvaliacaoComponent implements OnInit {

  public tituloPage = 'Cadastro de Avaliação';

  @ViewChild('entrega', { static: false })
  public entrega: any;

  @ViewChild('avaliado', { static: false })
  public avaliado: any;

  @ViewChild('comentario', { static: false })
  public comentario: any;

  @ViewChild('nota', { static: false })
  public nota: any;

  constructor(
    public usuarioService: UsuarioService,
    public entregaService: EntregaService,
    private avaliacaoService: AvaliacaoService,
    private mensagem: MensagensService,
    private util: UtilService
  ) { }

  ngOnInit() {
    this.tituloPage = this.tituloPage + (this.usuarioService.tipoUsuario === 2 ? ' do Entregador' : ' do Cliente');
    this.entregaService.buscarEntregasAvaliacao();
  }

  public selecionarAvaliado() {
    const entregaSelecionada = this.entrega.value;
    const entrega = this.entregaService.entregasAvaliacao.find((x: any) => x.id = entregaSelecionada);

    this.avaliado.nativeElement.value = entrega.nomeAvaliado;
  }

  public salvar() {
    const me = this;

    const parametros = {
      codigoEntrega: me.entrega.value,
      codigoCliente: me.usuarioService.codigoUsuario,
      nota: me.nota.value,
      descricao: me.comentario.nativeElement.value
    };

    me.avaliacaoService.salvar(parametros).then((retorno: any) => {
      if (retorno) {
        me.util.showAlertSuccess(me.mensagem.SALVO_SUCESSO);
        this.entregaService.buscarEntregasAvaliacao();
        me.limparCampos();
      } else {
        me.util.showAlertDanger(me.mensagem.FALHA_SALVAR_AVALIACAO);
      }
    }).catch(() => {
      me.util.showAlertDanger(me.mensagem.FALHA_SALVAR_AVALIACAO);
    }).finally(() => me.util.requestProgress = false);
  }

  private limparCampos() {
    const me = this;

    me.avaliado.nativeElement.value = '';
    me.entrega.value = 0;
    me.nota.value = 5;
    me.comentario.nativeElement.value = '';
  }

}