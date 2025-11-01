import { Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { PruebasComponent } from './components/pruebas/pruebas.component';
import { FelicitacionComponent } from './components/felicitacion/felicitacion.component';

export const routes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'pruebas', component: PruebasComponent },
  { path: 'felicitacion', component: FelicitacionComponent },
  { path: '**', redirectTo: '' }
];
