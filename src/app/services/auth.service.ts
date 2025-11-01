import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private isAuthenticatedSignal = signal(false);
  private readonly correctPassword = 'boda2025'; // Cambia esto por la clave que quieras

  // Getter público para el estado de autenticación
  get isAuthenticated() {
    return this.isAuthenticatedSignal.asReadonly();
  }

  // Método para validar login
  login(password: string): boolean {
    if (password === this.correctPassword) {
      this.isAuthenticatedSignal.set(true);
      // Guardar en sessionStorage para persistir durante la sesión
      sessionStorage.setItem('isAuthenticated', 'true');
      return true;
    }
    return false;
  }

  // Método para logout
  logout(): void {
    this.isAuthenticatedSignal.set(false);
    sessionStorage.removeItem('isAuthenticated');
  }

  // Verificar si hay una sesión activa (útil para recargas de página)
  checkAuthStatus(): void {
    const isAuth = sessionStorage.getItem('isAuthenticated') === 'true';
    this.isAuthenticatedSignal.set(isAuth);
  }

  // Método para verificar autenticación (usado por los guards)
  isLoggedIn(): boolean {
    return this.isAuthenticatedSignal();
  }
}