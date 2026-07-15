import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { OrcamentoComponent } from './pages/orcamento/orcamento.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'orcamento', component: OrcamentoComponent },
];
