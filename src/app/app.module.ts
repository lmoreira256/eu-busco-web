import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AutenticacaoComponent } from './pages/autenticacao/autenticacao.component';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { InterceptadorService } from './services/interceptador.service';
import { MatSidenavModule } from '@angular/material/sidenav';
import { CadastroEntregaComponent } from './pages/cadastro-entrega/cadastro-entrega.component';
import { CadastroEnderecoComponent } from './pages/cadastro-endereco/cadastro-endereco.component';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { CadastroCidadeComponent } from './pages/cadastro-cidade/cadastro-cidade.component';
import { CadastroUsuarioComponent } from './pages/cadastro-usuario/cadastro-usuario.component';
import { MatGridListModule } from '@angular/material/grid-list';
import { DatePipe } from '@angular/common';
import { MatDialogModule } from '@angular/material/dialog';
import { CadastroContatoComponent } from './pages/cadastro-contato/cadastro-contato.component';
import { CadastroAvaliacaoComponent } from './pages/cadastro-avaliacao/cadastro-avaliacao.component';
import { FormsModule, FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { MatMenuModule } from '@angular/material/menu';
import { MatExpansionModule } from '@angular/material';
import { PainelEntregasComponent } from './components/painel-entregas/painel-entregas.component';
import { MenuComponent } from './components/menu/menu.component';

@NgModule({
  declarations: [
    AppComponent,
    AutenticacaoComponent,
    DashboardComponent,
    CadastroEntregaComponent,
    CadastroEnderecoComponent,
    CadastroCidadeComponent,
    CadastroUsuarioComponent,
    CadastroContatoComponent,
    CadastroAvaliacaoComponent,
    PainelEntregasComponent,
    MenuComponent
  ],
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
    MatDialogModule,
    FormsModule,
    ReactiveFormsModule,
    MatMenuModule,
    MatExpansionModule
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: InterceptadorService, multi: true },
    DatePipe,
    FormBuilder
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
