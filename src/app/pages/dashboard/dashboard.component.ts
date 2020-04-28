import { Component, OnInit } from '@angular/core';
import { UsuarioService } from '../../services/usuario.service';
import { UtilService } from '../../services/util.service';
import { EntregaService } from '../../services/entrega.service';
import { MatDialog } from '@angular/material/dialog';
import { PagesService } from '../../services/pages.service';
import { Router } from '@angular/router';

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
    public dialog: MatDialog,
    public pages: PagesService,
    private util: UtilService,
    private router: Router
  ) {
    this.quantidadeCards = util.calcularTamanhoGrid();
    this.rowHeight = util.calcularRowHeightGrid();
  }

  ngOnInit() {
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
