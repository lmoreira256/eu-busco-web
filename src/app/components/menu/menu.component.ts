import { Component, OnInit } from '@angular/core';
import { UsuarioService } from 'src/app/services/usuario.service';
import { PagesService } from 'src/app/services/pages.service';
import { UtilService } from 'src/app/services/util.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {

  constructor(
    public usuarioService: UsuarioService,
    private pages: PagesService,
    private util: UtilService
  ) { }

  ngOnInit() {
  }

  openDeliveryRecord() {
    this.util.openProgram(this.pages.CADASTRO_ENTREGA);
  }

}
