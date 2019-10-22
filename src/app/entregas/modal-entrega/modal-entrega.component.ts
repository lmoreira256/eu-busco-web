import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { UtilService } from 'src/app/services/util.service';
import { EntregaService } from 'src/app/services/entrega.service';
import { UsuarioService } from 'src/app/services/usuario.service';
import { MensagensService } from 'src/app/services/mensagens.service';

@Component({
  selector: 'app-modal-entrega',
  templateUrl: './modal-entrega.component.html',
  styleUrls: ['./modal-entrega.component.scss']
})
export class ModalEntregaComponent {

  public entrega: any;

  constructor(
    public util: UtilService,
    public entregaService: EntregaService,
    private usuarioService: UsuarioService,
    private mensagem: MensagensService,
    public dialogRef: MatDialogRef<ModalEntregaComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.entrega = data;
  }

  public fecharModal() {
    this.entregaService.buscarDisponiveis();
    this.dialogRef.close();
  }

  public pegarEntrega() {
    const me = this;

    const parametros = {
      codigoEntrega: me.entrega.idEntrega,
      codigoEntregador: me.usuarioService.idUsuario
    };

    me.entregaService.pegarEntrega(parametros).then((retorno: any) => {
      if (retorno) {
        this.fecharModal();
      } else {
        me.util.showAlertDanger(me.mensagem.FALHA_ENTREGA);
      }
    }).catch(() => {
      me.util.showAlertDanger(me.mensagem.FALHA_ENTREGA);
    });
  }

}
