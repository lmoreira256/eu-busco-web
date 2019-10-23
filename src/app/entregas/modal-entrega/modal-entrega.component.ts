import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { UtilService } from 'src/app/services/util.service';
import { EntregaService } from 'src/app/services/entrega.service';
import { UsuarioService } from 'src/app/services/usuario.service';
import { MensagensService } from 'src/app/services/mensagens.service';
import { PagesService } from 'src/app/services/pages.service';

@Component({
  selector: 'app-modal-entrega',
  templateUrl: './modal-entrega.component.html',
  styleUrls: ['./modal-entrega.component.scss']
})
export class ModalEntregaComponent {

  public entrega: any;
  public paginaAberta: string;

  constructor(
    public util: UtilService,
    public entregaService: EntregaService,
    private usuarioService: UsuarioService,
    private mensagem: MensagensService,
    private pages: PagesService,
    public dialogRef: MatDialogRef<ModalEntregaComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.entrega = data.entregaSelecionada;
    this.paginaAberta = data.paginaAberta;
  }

  public fecharModal() {
    const me = this;
    debugger
    if (me.paginaAberta === me.pages.ENTREGAS) {
      me.entregaService.buscarDisponiveis();
    } else {
      if (me.usuarioService.tipoUsuario !== 3) {
        me.entregaService.buscarAbertasCliente();
      } else {
        me.entregaService.buscarAbertasEntregador();
      }
    }

    me.dialogRef.close();
  }

  public pegarEntrega() {
    const me = this;

    const parametros = {
      codigoEntrega: me.entrega.idEntrega,
      codigoEntregador: me.usuarioService.idUsuario
    };

    me.entregaService.pegarEntrega(parametros).then((retorno: any) => {
      if (retorno) {
        me.fecharModal();
      } else {
        me.util.showAlertDanger(me.mensagem.FALHA_PEGAR_ENTREGA);
      }
    }).catch(() => {
      me.util.showAlertDanger(me.mensagem.FALHA_PEGAR_ENTREGA);
    });
  }

  public largarEntrega() {
    const me = this;

    me.entregaService.largarEntrega(me.entrega.idEntrega).then((retorno: any) => {
      debugger
      if (retorno) {
        me.fecharModal();
      } else {
        me.util.showAlertDanger(me.mensagem.FALHA_LARGAR_ENTREGA);
      }
    }).catch(() => {
      me.util.showAlertDanger(me.mensagem.FALHA_LARGAR_ENTREGA);
    });
  }

  public excluirEntrega() {
    const me = this;

    me.entregaService.excluirEntrega(me.entrega.idEntrega).then((retorno: any) => {
      if (retorno) {
        me.fecharModal();
      } else {
        me.util.showAlertDanger(me.mensagem.FALHA_LARGAR_ENTREGA);
      }
    }).catch(() => {
      me.util.showAlertDanger(me.mensagem.FALHA_LARGAR_ENTREGA);
    });
  }

}
