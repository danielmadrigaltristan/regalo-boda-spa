import { inject } from '@angular/core';
import { Router, type CanActivateFn } from '@angular/router';
import { AuthService } from '../services/auth.service';

export const loginGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  // Verificar el estado de autenticación
  authService.checkAuthStatus();

  if (authService.isLoggedIn()) {
    // Si ya está autenticado, redirigir a pruebas
    router.navigate(['/pruebas']);
    return false;
  }

  // Si no está autenticado, permitir acceso al login
  return true;
};