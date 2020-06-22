import { Component, OnInit, ViewChild } from '@angular/core';
import { EnderecoService } from '../../services/endereco.service';
import { UsuarioService } from '../../services/usuario.service';
import { FormControl } from '@angular/forms';
import { EntregaService } from '../../services/entrega.service';
import { MensagensService } from '../../services/mensagens.service';
import { UtilService } from '../../services/util.service';
import { Router } from '@angular/router';
import { PagesService } from '../../services/pages.service';
import { DateAdapter, MAT_DATE_FORMATS } from '@angular/material/core';
import { AppDateAdapter, APP_DATE_FORMATS } from 'src/app/util/format-datepicker/format-datepicker';
import { MatDatepickerInputEvent } from '@angular/material';

@Component({
  selector: 'app-cadastro-entrega',
  templateUrl: './cadastro-entrega.component.html',
  styleUrls: ['./cadastro-entrega.component.scss'],
  providers: [
    { provide: DateAdapter, useClass: AppDateAdapter },
    { provide: MAT_DATE_FORMATS, useValue: APP_DATE_FORMATS }
  ]
})
export class CadastroEntregaComponent implements OnInit {

  @ViewChild('titulo', { static: false })
  public titulo: any;

  @ViewChild('enderecoColeta', { static: false })
  public enderecoColeta: any;

  @ViewChild('enderecoEntrega', { static: false })
  public enderecoEntrega: any;

  @ViewChild('descricao', { static: false })
  public descricao: any;

  @ViewChild('volume', { static: false })
  public volume: any;

  public startDate = new Date();
  public dataColeta = new FormControl();
  public dataEntrega = new FormControl();

  public dateColeta: Date;
  public dateEntrega: Date;

  constructor(
    private enderecoService: EnderecoService,
    private usuarioService: UsuarioService,
    private entregaService: EntregaService,
    private mensagem: MensagensService,
    private util: UtilService,
    private router: Router,
    private pages: PagesService
  ) { }

  ngOnInit() {
    this.enderecoService.adquirirTodosUsuario();
  }

  public salvar() {
    const me = this;

    const parametros = {
      codigoCliente: me.usuarioService.codigoUsuario,
      codigoEnderecoColeta: me.enderecoColeta.value,
      codigoEnderecoEntrega: me.enderecoEntrega.value,
      titulo: me.titulo.nativeElement.value,
      descricao: me.descricao.nativeElement.value,
      dataColeta: me.dateColeta,
      dataPrazoEntrega: me.dateEntrega,
      volume: me.volume.nativeElement.value
    };

    me.entregaService.salvar(parametros).then((retorno: any) => {
      if (retorno) {
        me.util.showAlertSuccess(me.mensagem.SALVO_SUCESSO);
        me.limparCampos();
        me.entregaService.getAllDeliveryes();
        me.router.navigate([me.pages.DASHBOARD]);
      } else {
        me.util.showAlertDanger(me.mensagem.FALHA_SALVAR_ENDERECO);
      }
    }).catch(() => {
      me.util.showAlertDanger(me.mensagem.FALHA_SALVAR_ENDERECO);
    }).finally(() => me.util.requestProgress = false);
  }

  private limparCampos() {
    const me = this;

    me.enderecoColeta.value = 0;
    me.enderecoEntrega.value = 0;
    me.titulo.nativeElement.value = '';
    me.descricao.nativeElement.value = '';
    me.dataColeta.setValue('');
    me.dataEntrega.setValue('');
    me.volume.nativeElement.value = '';
  }

  addDateColeta(event: MatDatepickerInputEvent<Date>) {
    this.dateColeta = event.value;
  }

  addDateEntrega(event: MatDatepickerInputEvent<Date>) {
    this.dateEntrega = event.value;
  }

}
