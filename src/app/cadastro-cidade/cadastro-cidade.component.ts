import { Component, OnInit, ViewChild } from '@angular/core';
import { EstadoService } from '../services/estado.service';
import { CidadeService } from '../services/cidade.service';
import { UtilService } from '../services/util.service';
import { MensagensService } from '../services/mensagens.service';

@Component({
  selector: 'app-cadastro-cidade',
  templateUrl: './cadastro-cidade.component.html',
  styleUrls: ['./cadastro-cidade.component.scss']
})
export class CadastroCidadeComponent implements OnInit {

  @ViewChild('campoEstado', { static: false })
  public campoEstado: any;

  @ViewChild('descricao', { static: false })
  public descricao: any;

  @ViewChild('sigla', { static: false })
  public sigla: any;

  @ViewChild('cep', { static: false })
  public cep: any;

  constructor(
    public estadoService: EstadoService,
    private cidadeService: CidadeService,
    private util: UtilService,
    private mensagem: MensagensService
  ) { }

  ngOnInit() {
    this.estadoService.adquirirTodos();
  }

  public salvar() {
    const me = this;

    const parametros = {
      codigoEstado: me.campoEstado.value,
      cep: me.cep.nativeElement.value,
      sigla: me.sigla.nativeElement.value,
      descricao: me.descricao.nativeElement.value
    };

    me.cidadeService.salvar(parametros).then((retorno: any) => {
      if (retorno) {
        me.util.showAlertSuccess(me.mensagem.SALVO_SUCESSO);
        me.limparCampos();
      } else {
        me.util.showAlertDanger(me.mensagem.FALHA_SALVAR_CIDADE);
      }
    }).catch(() => {
      me.util.showAlertDanger(me.mensagem.FALHA_SALVAR_CIDADE);
    }).finally(() => me.util.requestProgress = false);
  }

  private limparCampos() {
    const me = this;

    me.campoEstado.value = 0;
    me.cep.nativeElement.value = '';
    me.sigla.nativeElement.value = '';
    me.descricao.nativeElement.value = '';
  }

}
