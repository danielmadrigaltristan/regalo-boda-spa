import { Component, signal } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../services/auth.service';
import { FloatingFacesComponent } from '../floating-faces/floating-faces.component';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, CommonModule, FloatingFacesComponent],
  template: `
    <div class="login-container">
      <div class="login-card">
        <h1>Que foto más bonita 🧩</h1>
        <p>Si habéis llegado hasta aquí, es porque habéis finalizado el precioso puzle y os han entregado la clave de acceso…</p>
        
        <form (ngSubmit)="onSubmit()" #loginForm="ngForm">
          <div class="form-group">
            <input 
              type="password" 
              [(ngModel)]="password" 
              name="password"
              placeholder="Clave secreta"
              class="form-input"
              required
            />
          </div>
          
          @if (errorMessage()) {
            <div class="error-message">
              {{ errorMessage() }}
            </div>
          }
          
          <button type="submit" class="submit-btn" [disabled]="!loginForm.valid">
            Comenzar
          </button>
        </form>
      </div>
      <!-- Caras flotantes de los novios -->
      <app-floating-faces></app-floating-faces>
    </div>
  `,
  styles: [`
    .login-container {
      min-height: 100vh;
      display: flex;
      align-items: center;
      justify-content: center;
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      padding: 20px;
    }

    .login-card {
      background: white;
      padding: 2rem;
      border-radius: 15px;
      box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
      max-width: 400px;
      width: 100%;
      text-align: center;
      position: relative;
      z-index: 10;
    }

    h1 {
      color: #333;
      margin-bottom: 1rem;
      font-size: 1.8rem;
    }

    p {
      color: #666;
      margin-bottom: 2rem;
      line-height: 1.5;
    }

    .form-group {
      margin-bottom: 1rem;
    }

    .form-input {
      width: 100%;
      padding: 12px;
      border: 2px solid #e1e5e9;
      border-radius: 8px;
      font-size: 16px;
      transition: border-color 0.3s;
      box-sizing: border-box;
    }

    .form-input:focus {
      outline: none;
      border-color: #667eea;
    }

    .submit-btn {
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      color: white;
      border: none;
      padding: 12px 30px;
      border-radius: 8px;
      font-size: 16px;
      cursor: pointer;
      transition: transform 0.2s;
      width: 100%;
    }

    .submit-btn:hover:not(:disabled) {
      transform: translateY(-2px);
    }

    .submit-btn:disabled {
      opacity: 0.6;
      cursor: not-allowed;
    }

    .error-message {
      color: #e74c3c;
      background: #ffe6e6;
      padding: 10px;
      border-radius: 5px;
      margin-bottom: 1rem;
      font-size: 14px;
    }
  `]
})
export class LoginComponent {
  password = '';
  errorMessage = signal('');

  constructor(
    private router: Router,
    private authService: AuthService
  ) {}

  onSubmit() {
    if (this.authService.login(this.password)) {
      this.router.navigate(['/pruebas']);
    } else {
      this.errorMessage.set('Clave incorrecta. Inténtalo de nuevo.');
      this.password = '';
    }
  }
}