import { Component, OnInit } from '@angular/core';
import { UsuarioService } from '../../services/usuario.service';
import { EntregaService } from '../../services/entrega.service';
import { MatDialog } from '@angular/material/dialog';
import { PagesService } from '../../services/pages.service';
import { PaginacaoDTO } from '../../interfaces/paginacao-dto';

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
    public pages: PagesService
  ) { }

  ngOnInit() {
  }

  buscarMaisEntregasAndamento() {
    const me = this;
    const entragasAndamento = me.entregaService.andamento;

    if (entragasAndamento.lista.length == entragasAndamento.total) {
      return;
    }

    const page = (entragasAndamento.lista.length / 4) + 1;

    me.entregaService.buscarEntregasAndamento(page).then((retorno: PaginacaoDTO) => {
      me.entregaService.andamento.lista = entragasAndamento.lista.concat(retorno.lista);
    });
  }

  buscarMaisEntregasAbertas() {
    const me = this;
    const entragasAbertas = me.entregaService.abertas;

    if (entragasAbertas.lista.length == entragasAbertas.total) {
      return;
    }

    const page = (entragasAbertas.lista.length / 4) + 1;

    me.entregaService.buscarEntregasAbertas(page).then((retorno: PaginacaoDTO) => {
      me.entregaService.abertas.lista = entragasAbertas.lista.concat(retorno.lista);
    });
  }

  buscarMaisEntregasFinalizadas() {
    const me = this;
    const entragasFinalizadas = me.entregaService.finalizadas;

    if (entragasFinalizadas.lista.length == entragasFinalizadas.total) {
      return;
    }

    const page = (entragasFinalizadas.lista.length / 4) + 1;

    me.entregaService.buscarEntregasFinalizadas(page).then((retorno: PaginacaoDTO) => {
      me.entregaService.finalizadas.lista = entragasFinalizadas.lista.concat(retorno.lista);
    });
  }

  buscarMaisEntregasExcluidas() {
    const me = this;
    const entragasExcluidas = me.entregaService.excluidas;

    if (entragasExcluidas.lista.length == entragasExcluidas.total) {
      return;
    }

    const page = (entragasExcluidas.lista.length / 4) + 1;

    me.entregaService.buscarEntregasExcluidas(page).then((retorno: PaginacaoDTO) => {
      me.entregaService.excluidas.lista = entragasExcluidas.lista.concat(retorno.lista);
    });
  }

}
