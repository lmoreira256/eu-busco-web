import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AutenticacaoComponent } from './autenticacao/autenticacao.component';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { DashboardComponent } from './dashboard/dashboard.component';
import { InterceptadorService } from './services/interceptador.service';
import { MatSidenavModule } from '@angular/material/sidenav';
import { CadastroEntregaComponent } from './cadastro-entrega/cadastro-entrega.component';
import { CadastroEnderecoComponent } from './cadastro-endereco/cadastro-endereco.component';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { CadastroCidadeComponent } from './cadastro-cidade/cadastro-cidade.component';
import { CadastroUsuarioComponent } from './cadastro-usuario/cadastro-usuario.component';
import { MatGridListModule } from '@angular/material/grid-list';
import { EntregasComponent } from './entregas/entregas.component';
import { DatePipe } from '@angular/common';
import { MatDialogModule } from '@angular/material/dialog';
import { ModalEntregaComponent } from './entregas/modal-entrega/modal-entrega.component';
import { CadastroContatoComponent } from './cadastro-contato/cadastro-contato.component';

@NgModule({
  declarations: [
    AppComponent,
    AutenticacaoComponent,
    DashboardComponent,
    CadastroEntregaComponent,
    CadastroEnderecoComponent,
    CadastroCidadeComponent,
    CadastroUsuarioComponent,
    EntregasComponent,
    ModalEntregaComponent,
    CadastroContatoComponent
  ],
  entryComponents: [ModalEntregaComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatDividerModule,
    MatIconModule,
    HttpClientModule,
    MatSidenavModule,
    MatSelectModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatGridListModule,
    MatDialogModule
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: InterceptadorService, multi: true },
    DatePipe
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
