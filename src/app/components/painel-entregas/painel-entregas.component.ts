import { Component, OnInit, Input } from '@angular/core';
import { EntregaService } from 'src/app/services/entrega.service';
import { PaginacaoDTO } from 'src/app/interfaces/paginacao-dto';
import { UsuarioService } from 'src/app/services/usuario.service';
import { UtilService } from 'src/app/services/util.service';
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
    public util: UtilService,
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

  pegarEntrega(entrega: any) {
    const me = this;

    const parametros = {
      codigoEntrega: entrega.codigo,
      codigoEntregador: me.usuarioService.codigoUsuario
    };

    me.entregaService.pegarEntrega(parametros).then((retorno: any) => {
      if (retorno) {
        me.entregaService.getAllDeliveryes();
        me.entregasExpandidas = [];
      } else {
        me.util.showAlertDanger(me.mensagem.FALHA_PEGAR_ENTREGA);
      }
    }).catch(() => {
      me.util.showAlertDanger(me.mensagem.FALHA_PEGAR_ENTREGA);
    });
  }

  largarEntrega(entrega: any) {
    const me = this;

    me.entregaService.largarEntrega(entrega.codigoEntrega).then((retorno: any) => {
      if (!retorno) {
        me.util.showAlertDanger(me.mensagem.FALHA_LARGAR_ENTREGA);
      }
    }).catch(() => {
      me.util.showAlertDanger(me.mensagem.FALHA_LARGAR_ENTREGA);
    });
  }

  excluirEntrega(entrega: any) {
    const me = this;

    me.entregaService.excluirEntrega(entrega.codigo).then((retorno: any) => {
      me.entregaService.getAllDeliveryes();

      if (!retorno) {
        me.util.showAlertDanger(me.mensagem.FALHA_EXCLUIR_ENTREGA);
      }
    }).catch(() => {
      me.util.showAlertDanger(me.mensagem.FALHA_EXCLUIR_ENTREGA);
    });
  }

  finalizarEntrega(entrega: any) {
    const me = this;

    me.entregaService.finalizarEntrega(entrega.codigo).then((retorno: any) => {
      if (retorno) {
        me.entregaService.getAllDeliveryes();
      } else {
        me.util.showAlertDanger(me.mensagem.FALHA_FINALIZAR_ENTREGA);
      }
    }).catch(() => {
      me.util.showAlertDanger(me.mensagem.FALHA_FINALIZAR_ENTREGA);
    });
  }

}
