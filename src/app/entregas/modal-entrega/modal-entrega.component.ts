import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { UtilService } from 'src/app/services/util.service';
import { EntregaService } from 'src/app/services/entrega.service';
import { UserService } from 'src/app/services/user.service';
import { MensagensService } from 'src/app/services/mensagens.service';
import { PagesService } from 'src/app/services/pages.service';
import { Router } from '@angular/router';

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
    private userService: UserService,
    private mensagem: MensagensService,
    private pages: PagesService,
    public dialogRef: MatDialogRef<ModalEntregaComponent>,
    private router: Router,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.entrega = data.entregaSelecionada;
    this.paginaAberta = data.paginaAberta;
  }

  public fecharModal() {
    const me = this;

    if (me.paginaAberta === me.pages.ENTREGAS) {
      me.entregaService.buscarDisponiveis();
    } else {
      if (me.userService.tipoUsuario !== 3) {
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
      codigoEntregador: me.userService.idUsuario
    };

    me.entregaService.pegarEntrega(parametros).then((retorno: any) => {
      if (retorno) {
        me.fecharModal();
        me.router.navigate([me.pages.DASHBOARD]);
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
        me.util.showAlertDanger(me.mensagem.FALHA_EXCLUIR_ENTREGA);
      }
    }).catch(() => {
      me.util.showAlertDanger(me.mensagem.FALHA_EXCLUIR_ENTREGA);
    });
  }

  public finalizarEntrega() {
    const me = this;

    me.entregaService.finalizarEntrega(me.entrega.idEntrega).then((retorno: any) => {
      if (retorno) {
        me.fecharModal();

        me.userService.buscarDadosUsuario().then((ret: any) => {
          me.userService.dadosUsuario = ret;
        }).catch(() => {
          me.util.showAlertDanger(me.mensagem.FALHA_DADOS_USUARIO);
        }).finally(() => me.util.requestProgress = false);

      } else {
        me.util.showAlertDanger(me.mensagem.FALHA_FINALIZAR_ENTREGA);
      }
    }).catch(() => {
      me.util.showAlertDanger(me.mensagem.FALHA_FINALIZAR_ENTREGA);
    });
  }

}
