import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { OrcamentoComponent } from './pages/orcamento/orcamento.component';

export const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    data: {
      title: 'D Lima Estruturas Metálicas',
      description: 'Soluções em estruturas metálicas, mezaninos, escadas, portões automáticos, grades e corrimãos em São Paulo. Solicite orçamento com a D Lima.',
      canonicalPath: '/',
      ogType: 'website',
      schemaType: 'LocalBusiness'
    }
  },
  {
    path: 'w',
    component: OrcamentoComponent,
    data: {
      title: 'Orçamento no WhatsApp | D Lima Estruturas Metálicas',
      description: 'Iniciando atendimento no WhatsApp para orçamento de serralheria, estruturas metálicas e portões automáticos.',
      canonicalPath: '/w',
      robots: 'noindex, follow',
      ogType: 'website',
      schemaType: 'WebPage'
    }
  },
  { path: 'z', redirectTo: 'w' },
  { path: 'wa', redirectTo: 'w' },
  { path: 'orcamento', redirectTo: 'w' },
  { path: 'encurtador', redirectTo: '' },
  { path: '**', redirectTo: '' }
];
