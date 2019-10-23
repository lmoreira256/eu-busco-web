import { Component, OnInit } from '@angular/core';
import { UsuarioService } from '../services/usuario.service';
import { UtilService } from '../services/util.service';
import { MensagensService } from '../services/mensagens.service';
import { EntregaService } from '../services/entrega.service';
import { MatDialog } from '@angular/material/dialog';
import { ModalEntregaComponent } from '../entregas/modal-entrega/modal-entrega.component';
import { PagesService } from '../services/pages.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  public quantidadeCards: number;
  public rowHeight: string;

  constructor(
    public usuarioService: UsuarioService,
    public entregaService: EntregaService,
    private util: UtilService,
    private mensagem: MensagensService,
    public dialog: MatDialog,
    private pages: PagesService
  ) {
    this.quantidadeCards = util.calcularTamanhoGrid();
    this.rowHeight = util.calcularRowHeightGrid();
  }

  ngOnInit() {
    this.adquirirDadosUsuario();

    if (this.usuarioService.tipoUsuario === 2) {
      this.entregaService.buscarAbertasCliente();
    } else if (this.usuarioService.tipoUsuario === 3) {
      this.entregaService.buscarAbertasEntregador();
    } else {
      this.entregaService.buscarTodasAbertas();
    }
  }

  private adquirirDadosUsuario() {
    this.usuarioService.buscarDadosUsuario().then((retorno: any) => {
      this.usuarioService.dadosUsuario = retorno;
    }).catch(() => {
      this.util.showAlertDanger(this.mensagem.FALHA_DADOS_USUARIO);
    }).finally(() => this.util.requestProgress = false);
  }

  public abrirEntrega(entrega: any): void {
    this.dialog.open(ModalEntregaComponent, {
      width: (this.util.tamanhoTela - 40).toString() + 'px',
      data: {
        entregaSelecionada: entrega,
        paginaAberta: this.pages.DASHBOARD
      }
    });
  }

}
