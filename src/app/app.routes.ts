import { Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { PruebasComponent } from './components/pruebas/pruebas.component';
import { FelicitacionComponent } from './components/felicitacion/felicitacion.component';
import { authGuard } from './guards/auth.guard';
import { loginGuard } from './guards/login.guard';

export const routes: Routes = [
  { 
    path: '', 
    component: LoginComponent,
    canActivate: [loginGuard]
  },
  { 
    path: 'pruebas', 
    component: PruebasComponent,
    canActivate: [authGuard]
  },
  { 
    path: 'felicitacion', 
    component: FelicitacionComponent,
    canActivate: [authGuard]
  },
  { path: '**', redirectTo: '' }
];
