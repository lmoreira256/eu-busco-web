import { Component, OnInit } from '@angular/core';
import { EntregaService } from '../services/entrega.service';
import { UtilService } from '../services/util.service';
import { MatDialog } from '@angular/material/dialog';
import { ModalEntregaComponent } from './modal-entrega/modal-entrega.component';
import { PagesService } from '../services/pages.service';

@Component({
  selector: 'app-entregas',
  templateUrl: './entregas.component.html',
  styleUrls: ['./entregas.component.scss']
})
export class EntregasComponent implements OnInit {

  public quantidadeCards: number;
  public rowHeight: string;

  constructor(
    public entregaService: EntregaService,
    public util: UtilService,
    public dialog: MatDialog,
    private pages: PagesService
  ) {
    this.quantidadeCards = util.calcularTamanhoGrid();
    this.rowHeight = util.calcularRowHeightGrid();
  }

  ngOnInit() {
  }

  public abrirEntrega(entrega: any): void {
    this.dialog.open(ModalEntregaComponent, {
      width: (this.util.tamanhoTela - 40).toString() + 'px',
      data: {
        entregaSelecionada: entrega,
        paginaAberta: this.pages.ENTREGAS
      }
    });
  }

}
