import { NgModule, Component } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FormularioComponent } from './pages/produtos/formulario/formulario.component';
import { ListagemComponent } from './pages/produtos/listagem/listagem.component';

const routes: Routes = [
  { path: '', redirectTo: 'listagem', pathMatch: 'full'},
  {path: 'formulario', component: FormularioComponent },
  {path: 'listagem', component: ListagemComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
