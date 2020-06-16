import { Component, OnInit, Input } from '@angular/core';
import { EntregaService } from 'src/app/services/entrega.service';
import { PaginacaoDTO } from 'src/app/interfaces/paginacao-dto';

@Component({
  selector: 'app-painel-entregas',
  templateUrl: './painel-entregas.component.html',
  styleUrls: ['./painel-entregas.component.scss']
})
export class PainelEntregasComponent implements OnInit {

  @Input() titulo: string;
  @Input() entregas: PaginacaoDTO;
  @Input() verMaisFuncion: any;

  constructor(
    public entregaService: EntregaService
  ) { }

  ngOnInit() {
  }

  verMais() {
    this.verMaisFuncion();
  }

}
