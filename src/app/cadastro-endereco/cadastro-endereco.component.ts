import { Component, ViewChild, OnInit } from '@angular/core';
import { CidadeService } from '../services/cidade.service';
import { EnderecoService } from '../services/endereco.service';
import { UsuarioService } from '../services/usuario.service';
import { UtilService } from '../services/util.service';
import { MensagensService } from '../services/mensagens.service';

@Component({
  selector: 'app-cadastro-endereco',
  templateUrl: './cadastro-endereco.component.html',
  styleUrls: ['./cadastro-endereco.component.scss']
})
export class CadastroEnderecoComponent implements OnInit {

  @ViewChild('campoCidade', { static: false })
  public campoCidade: any;

  @ViewChild('titulo', { static: false })
  public titulo: any;

  @ViewChild('descricaoEndereco', { static: false })
  public descricaoEndereco: any;

  @ViewChild('complemento', { static: false })
  public complemento: any;

  @ViewChild('bairro', { static: false })
  public bairro: any;

  @ViewChild('numero', { static: false })
  public numero: any;

  constructor(
    public cidadeService: CidadeService,
    private enderecoService: EnderecoService,
    private usuarioService: UsuarioService,
    private util: UtilService,
    private mensagem: MensagensService
  ) { }

  ngOnInit() {
    this.cidadeService.adquirirTodos();
  }

  public salvar() {
    const me = this;

    const parametros = {
      codigoCidade: me.campoCidade.value,
      codigoUsuario: me.usuarioService.codigoUsuario,
      descricaoEndereco: me.descricaoEndereco.nativeElement.value,
      titulo: me.titulo.nativeElement.value,
      complemento: me.complemento.nativeElement.value,
      bairro: me.bairro.nativeElement.value,
      numero: Number(me.numero.nativeElement.value)
    };

    me.enderecoService.salvar(parametros).then((retorno: any) => {
      if (retorno) {
        me.util.showAlertSuccess(me.mensagem.SALVO_SUCESSO);
        me.limparCampos();
      } else {
        me.util.showAlertDanger(me.mensagem.FALHA_SALVAR_ENDERECO);
      }
    }).catch(() => {
      me.util.showAlertDanger(me.mensagem.FALHA_SALVAR_ENDERECO);
    }).finally(() => me.util.requestProgress = false);
  }

  private limparCampos() {
    const me = this;

    me.campoCidade.value = 0;
    me.descricaoEndereco.nativeElement.value = '';
    me.titulo.nativeElement.value = '';
    me.complemento.nativeElement.value = '';
    me.bairro.nativeElement.value = '';
    me.numero.nativeElement.value = '';
  }

}
