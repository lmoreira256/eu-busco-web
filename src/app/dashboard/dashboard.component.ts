import { Component, OnInit } from '@angular/core';
import { UsuarioService } from '../services/usuario.service';
import { UtilService } from '../services/util.service';
import { MensagensService } from '../services/mensagens.service';
import { EntregaService } from '../services/entrega.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  public quantidadeCards: number;
  public rowHeight: string;
  public dadosUsuario = {
    nota: '-',
    entregasAbertas: '-',
    totalEntregas: '-'
  };

  constructor(
    public usuarioService: UsuarioService,
    public entregaService: EntregaService,
    private util: UtilService,
    private mensagem: MensagensService
  ) {
    this.quantidadeCards = util.calcularTamanhoGrid();
    this.rowHeight = util.calcularRowHeightGrid();
  }

  ngOnInit() {
    this.adquirirDadosUsuario();

    if (this.usuarioService.tipoUsuario !== 3) {
      this.entregaService.buscarAbertasCliente();
    } else {
      this.entregaService.buscarAbertasEntregador();
    }
  }

  private adquirirDadosUsuario() {
    this.usuarioService.buscarDadosUsuario().then((retorno: any) => {
      this.dadosUsuario = retorno;
    }).catch(() => {
      this.util.showAlertDanger(this.mensagem.FALHA_DADOS_USUARIO);
    }).finally(() => this.util.requestProgress = false);
  }

}
