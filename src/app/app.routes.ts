import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'home',
    loadComponent: () => import('./home/home.page').then((m) => m.HomePage),
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
  {
    path: 'detalle/:name', 
    loadComponent: () => import('./detalle/detalle.page').then((m) => m.DetallePage),
  },
  {
    path: 'detalle',
    loadComponent: () => import('./detalle/detalle.page').then( m => m.DetallePage)
  },
];