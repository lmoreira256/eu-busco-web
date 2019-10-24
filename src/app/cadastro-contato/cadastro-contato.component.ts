import { Component, OnInit } from '@angular/core';
import { UsuarioService } from '../services/usuario.service';

@Component({
  selector: 'app-cadastro-contato',
  templateUrl: './cadastro-contato.component.html',
  styleUrls: ['./cadastro-contato.component.scss']
})
export class CadastroContatoComponent implements OnInit {

  public usuarios = [];

  constructor(
    public usuarioService: UsuarioService
  ) { }

  ngOnInit() {
    this.buscarUsuarios();
  }

  private buscarUsuarios() {
    const me = this;

    me.usuarioService.buscarTodosUsuarios().then((retorno: any) => {
      me.usuarios = retorno;
    });
  }

}
