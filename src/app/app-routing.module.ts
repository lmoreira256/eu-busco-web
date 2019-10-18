import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AutenticacaoComponent } from './autenticacao/autenticacao.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { CadastroEntregaComponent } from './cadastro-entrega/cadastro-entrega.component';
import { CadastroEnderecoComponent } from './cadastro-endereco/cadastro-endereco.component';
import { CadastroUsuarioComponent } from './cadastro-usuario/cadastro-usuario.component';
import { CadastroCidadeComponent } from './cadastro-cidade/cadastro-cidade.component';
import { EntregasComponent } from './entregas/entregas.component';

const routes: Routes = [
  { path: '', component: AutenticacaoComponent },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'cadastro-entrega', component: CadastroEntregaComponent },
  { path: 'cadastro-endereco', component: CadastroEnderecoComponent },
  { path: 'cadastro-usuario', component: CadastroUsuarioComponent },
  { path: 'cadastro-cidade', component: CadastroCidadeComponent },
  { path: 'entregas', component: EntregasComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
