import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AutenticacaoComponent } from './pages/autenticacao/autenticacao.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { CadastroEntregaComponent } from './pages/cadastro-entrega/cadastro-entrega.component';
import { CadastroEnderecoComponent } from './pages/cadastro-endereco/cadastro-endereco.component';
import { CadastroUsuarioComponent } from './pages/cadastro-usuario/cadastro-usuario.component';
import { CadastroCidadeComponent } from './pages/cadastro-cidade/cadastro-cidade.component';
import { CadastroContatoComponent } from './pages/cadastro-contato/cadastro-contato.component';
import { CadastroAvaliacaoComponent } from './pages/cadastro-avaliacao/cadastro-avaliacao.component';

const routes: Routes = [
  { path: '', component: AutenticacaoComponent },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'cadastro-entrega', component: CadastroEntregaComponent },
  { path: 'cadastro-endereco', component: CadastroEnderecoComponent },
  { path: 'cadastro-usuario', component: CadastroUsuarioComponent },
  { path: 'cadastro-cidade', component: CadastroCidadeComponent },
  { path: 'cadastro-contato', component: CadastroContatoComponent },
  { path: 'cadastro-avaliacao', component: CadastroAvaliacaoComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
