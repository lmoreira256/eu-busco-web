import { Component, OnInit } from '@angular/core';
import { UsuarioService } from '../../services/usuario.service';
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

  constructor(
    public usuarioService: UsuarioService,
    public entregaService: EntregaService,
    public dialog: MatDialog,
    public pages: PagesService,
    private router: Router
  ) { }

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

  buscarMaisEntregasAbertas() {
    console.log('buscarMaisEntregasAbertas');

    this.entregaService.buscarEntregasAbertas(this.entregaService.paginaEntregasAbertas + 1).then((obj) => {

    });
  }

}
