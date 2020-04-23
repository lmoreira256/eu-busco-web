import { Component, OnInit } from '@angular/core';
import { UsuarioService } from '../services/usuario.service';
import { UtilService } from '../services/util.service';
import { MensagensService } from '../services/mensagens.service';
import { EntregaService } from '../services/entrega.service';
import { MatDialog } from '@angular/material/dialog';
import { ModalEntregaComponent } from '../entregas/modal-entrega/modal-entrega.component';
import { PagesService } from '../services/pages.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  public quantidadeCards: number;
  public rowHeight: string;

  public showDeliveriesToUser = false;

  constructor(
    public usuarioService: UsuarioService,
    public entregaService: EntregaService,
    public dialog: MatDialog,
    public pages: PagesService,
    private util: UtilService,
    private mensagem: MensagensService,
    private router: Router
  ) {
    this.quantidadeCards = util.calcularTamanhoGrid();
    this.rowHeight = util.calcularRowHeightGrid();
  }

  ngOnInit() {
    this.adquirirDadosUsuario();

    this.showDeliveriesToUser = this.entregaService.entregasAbertas.lista.length > 0;
    console.log(this.showDeliveriesToUser);

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

  logOff() {
    const me = this;

    me.usuarioService.usuarioLogado = false;
    me.router.navigate(['']);
  }

  openProgram(program: string) {
    this.router.navigate([program]);
  }

  openDeliveryRecord() {
    this.openProgram(this.pages.CADASTRO_ENTREGA);
  }

}
