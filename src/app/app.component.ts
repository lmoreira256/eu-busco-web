import { Component, OnInit, ViewChild } from '@angular/core';
import { UtilService } from './services/util.service';
import { UserService } from './services/user.service';
import { Router } from '@angular/router';
import { PagesService } from './services/pages.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  @ViewChild('menu', { static: false })
  public menu: any;

  constructor(
    public util: UtilService,
    public userService: UserService,
    private router: Router,
    public pages: PagesService
  ) { }

  ngOnInit() {
    this.verificarLogin();
  }

  private verificarLogin() {
    if (!this.userService.usuarioLogado) {
      this.router.navigate(['']);
    }
  }

  public sair() {
    const me = this;

    me.menu.close();
    me.userService.usuarioLogado = false;
    me.router.navigate(['']);
  }

  public abrirPrograma(programa: string) {
    this.menu.close();
    this.router.navigate([programa]);
  }

}
