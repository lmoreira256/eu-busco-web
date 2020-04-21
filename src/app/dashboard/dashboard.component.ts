import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';
import { UtilService } from '../services/util.service';
import { MensagensService } from '../services/mensagens.service';
import { EntregaService } from '../services/entrega.service';
import { MatDialog } from '@angular/material/dialog';
import { ModalEntregaComponent } from '../entregas/modal-entrega/modal-entrega.component';
import { PagesService } from '../services/pages.service';
import { DeliveryService } from '../services/delivery.service';
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
    public userService: UserService,
    public entregaService: EntregaService,
    public dialog: MatDialog,
    public pages: PagesService,
    public deliveryService: DeliveryService,
    private util: UtilService,
    private mensagem: MensagensService,
    private router: Router
  ) {
    this.quantidadeCards = util.calcularTamanhoGrid();
    this.rowHeight = util.calcularRowHeightGrid();
  }

  ngOnInit() {
    this.adquirirDadosUsuario();

    this.showDeliveriesToUser = this.deliveryService.deliveriesToUser.length > 0;
    console.log(this.showDeliveriesToUser);

    if (this.userService.tipoUsuario === 2) {
      this.entregaService.buscarAbertasCliente();
    } else if (this.userService.tipoUsuario === 3) {
      this.entregaService.buscarAbertasEntregador();
    } else {
      this.entregaService.buscarTodasAbertas();
    }
  }

  private adquirirDadosUsuario() {
    this.userService.buscarDadosUsuario().then((retorno: any) => {
      this.userService.dadosUsuario = retorno;
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

    me.userService.usuarioLogado = false;
    me.router.navigate(['']);
  }

  openProgram(program: string) {
    this.router.navigate([program]);
  }

  openDeliveryRecord() {
    this.openProgram(this.pages.CADASTRO_ENTREGA);
  }

}
