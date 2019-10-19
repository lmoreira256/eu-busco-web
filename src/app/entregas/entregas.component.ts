import { Component, OnInit } from '@angular/core';
import { EntregaService } from '../services/entrega.service';
import { UtilService } from '../services/util.service';

@Component({
  selector: 'app-entregas',
  templateUrl: './entregas.component.html',
  styleUrls: ['./entregas.component.scss']
})
export class EntregasComponent implements OnInit {

  public quantidadeCards: number;

  constructor(
    public entregaService: EntregaService,
    public util: UtilService
  ) {
    this.quantidadeCards = util.calcularTamanhoGrid();
  }

  ngOnInit() {
    this.entregaService.buscarDisponiveis();
  }

}
