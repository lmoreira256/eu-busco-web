import { Component, OnInit, Input } from '@angular/core';
import { EntregaService } from 'src/app/services/entrega.service';
import { PaginacaoDTO } from 'src/app/interfaces/paginacao-dto';
import { UsuarioService } from 'src/app/services/usuario.service';
import { UtilService } from 'src/app/services/util.service';
import { PagesService } from 'src/app/services/pages.service';
import { Router } from '@angular/router';
import { MensagensService } from 'src/app/services/mensagens.service';

@Component({
  selector: 'app-painel-entregas',
  templateUrl: './painel-entregas.component.html',
  styleUrls: ['./painel-entregas.component.scss']
})
export class PainelEntregasComponent implements OnInit {

  entregasExpandidas = [];

  @Input() titulo: string;
  @Input() entregas: PaginacaoDTO;
  @Input() verMaisFuncion: any;

  constructor(
    public entregaService: EntregaService,
    public usuarioService: UsuarioService,
    private util: UtilService,
    private pages: PagesService,
    private router: Router,
    private mensagem: MensagensService
  ) { }

  ngOnInit() {
  }

  verMais() {
    this.verMaisFuncion();
  }

  expand(entrega: any) {
    if (this.entregasExpandidas.includes(entrega.codigo)) {
      const index = this.entregasExpandidas.indexOf(entrega.codigo);
      this.entregasExpandidas.splice(index, 1);
    } else {
      this.entregasExpandidas = this.entregasExpandidas.concat(entrega.codigo);
    }
  }

  public pegarEntrega(entrega: any) {
    const me = this;

    const parametros = {
      codigoEntrega: entrega.codigoEntrega,
      codigoEntregador: me.usuarioService.codigoUsuario
    };

    me.entregaService.pegarEntrega(parametros).then((retorno: any) => {
      if (retorno) {
        me.router.navigate([me.pages.DASHBOARD]);
      } else {
        me.util.showAlertDanger(me.mensagem.FALHA_PEGAR_ENTREGA);
      }
    }).catch(() => {
      me.util.showAlertDanger(me.mensagem.FALHA_PEGAR_ENTREGA);
    });
  }

  public largarEntrega(entrega: any) {
    const me = this;

    me.entregaService.largarEntrega(entrega.codigoEntrega).then((retorno: any) => {
      if (!retorno) {
        me.util.showAlertDanger(me.mensagem.FALHA_LARGAR_ENTREGA);
      }
    }).catch(() => {
      me.util.showAlertDanger(me.mensagem.FALHA_LARGAR_ENTREGA);
    });
  }

  public excluirEntrega(entrega: any) {
    const me = this;

    me.entregaService.excluirEntrega(entrega.codigoEntrega).then((retorno: any) => {
      if (!retorno) {
        me.util.showAlertDanger(me.mensagem.FALHA_EXCLUIR_ENTREGA);
      }
    }).catch(() => {
      me.util.showAlertDanger(me.mensagem.FALHA_EXCLUIR_ENTREGA);
    });
  }

  public finalizarEntrega(entrega: any) {
    const me = this;

    me.entregaService.finalizarEntrega(entrega.codigoEntrega).then((retorno: any) => {
      if (retorno) {
        // me.usuarioService.buscarDadosUsuario().then((ret: any) => {
        //   me.usuarioService.dadosUsuario = ret;
        // }).catch(() => {
        //   me.util.showAlertDanger(me.mensagem.FALHA_DADOS_USUARIO);
        // }).finally(() => me.util.requestProgress = false);

      } else {
        me.util.showAlertDanger(me.mensagem.FALHA_FINALIZAR_ENTREGA);
      }
    }).catch(() => {
      me.util.showAlertDanger(me.mensagem.FALHA_FINALIZAR_ENTREGA);
    });
  }


}
