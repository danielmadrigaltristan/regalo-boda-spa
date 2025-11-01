import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { PruebasService } from '../../services/pruebas.service';
import { AuthService } from '../../services/auth.service';
import { FloatingFacesComponent } from '../floating-faces/floating-faces.component';

@Component({
  selector: 'app-felicitacion',
  standalone: true,
  imports: [FloatingFacesComponent],
  template: `
    <div class="felicitacion-container">
      <div class="felicitacion-card">
        <div class="celebration-icon">🎉</div>
        
        <h1>¡Felicitaciones!</h1>
        
        <div class="message">
          <p>¡Habéis completado todas las pruebas con éxito!</p>
          <p>Vuestro amor ha superado todos los desafíos y ahora podéis celebrar juntos este momento especial.</p>
          <p>Como regalo final, os invitamos a uniros a nuestro grupo de WhatsApp donde podremos seguir compartiendo momentos especiales.</p>
        </div>
        
        <div class="stats">
          <div class="stat">
            <span class="number">{{ pruebasService.getTotalPruebas() }}</span>
            <span class="label">Pruebas Completadas</span>
          </div>
        </div>
        
        <div class="actions">
          <button (click)="abrirWhatsApp()" class="whatsapp-btn">
            <span class="whatsapp-icon">📱</span>
            Unirse al Grupo de WhatsApp
          </button>
          
          <button (click)="reiniciar()" class="restart-btn">
            Reiniciar Pruebas
          </button>
          
          <button (click)="logout()" class="logout-btn">
            Cerrar Sesión
          </button>
        </div>
        
        <div class="final-message">
          <p>¡Que tengáis una boda maravillosa! 💕</p>
        </div>
      </div>
      <!-- Caras flotantes de los novios -->
      <app-floating-faces></app-floating-faces>
    </div>
  `,
  styles: [`
    .felicitacion-container {
      min-height: 100vh;
      background: linear-gradient(135deg, #fd79a8 0%, #fdcb6e 50%, #6c5ce7 100%);
      padding: 20px;
      display: flex;
      align-items: center;
      justify-content: center;
    }

    .felicitacion-card {
      background: white;
      padding: 3rem;
      border-radius: 20px;
      box-shadow: 0 15px 40px rgba(0, 0, 0, 0.2);
      max-width: 600px;
      width: 100%;
      text-align: center;
      position: relative;
      overflow: hidden;
      z-index: 10;
    }

    .felicitacion-card::before {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      height: 5px;
      background: linear-gradient(90deg, #fd79a8, #fdcb6e, #6c5ce7);
    }

    .celebration-icon {
      font-size: 4rem;
      margin-bottom: 1rem;
      animation: bounce 2s infinite;
    }

    @keyframes bounce {
      0%, 20%, 50%, 80%, 100% {
        transform: translateY(0);
      }
      40% {
        transform: translateY(-20px);
      }
      60% {
        transform: translateY(-10px);
      }
    }

    h1 {
      color: #2d3436;
      margin-bottom: 2rem;
      font-size: 2.5rem;
      background: linear-gradient(135deg, #fd79a8, #6c5ce7);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      background-clip: text;
    }

    .message {
      margin-bottom: 2rem;
    }

    .message p {
      color: #636e72;
      line-height: 1.6;
      margin-bottom: 1rem;
      font-size: 1.1rem;
    }

    .stats {
      background: linear-gradient(135deg, #fd79a8, #fdcb6e);
      padding: 1.5rem;
      border-radius: 15px;
      margin-bottom: 2rem;
      color: white;
    }

    .stat .number {
      display: block;
      font-size: 2.5rem;
      font-weight: bold;
      margin-bottom: 0.5rem;
    }

    .stat .label {
      font-size: 1rem;
      opacity: 0.9;
    }

    .actions {
      display: flex;
      flex-direction: column;
      gap: 1rem;
      margin-bottom: 2rem;
    }

    .whatsapp-btn {
      background: #25d366;
      color: white;
      border: none;
      padding: 15px 30px;
      border-radius: 12px;
      font-size: 16px;
      font-weight: 600;
      cursor: pointer;
      transition: all 0.3s;
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 10px;
    }

    .whatsapp-btn:hover {
      background: #128c7e;
      transform: translateY(-2px);
      box-shadow: 0 5px 15px rgba(37, 211, 102, 0.4);
    }

    .whatsapp-icon {
      font-size: 1.2rem;
    }

    .restart-btn {
      background: #636e72;
      color: white;
      border: none;
      padding: 12px 30px;
      border-radius: 12px;
      font-size: 14px;
      cursor: pointer;
      transition: all 0.3s;
    }

    .restart-btn:hover {
      background: #2d3436;
      transform: translateY(-2px);
    }

    .logout-btn {
      background: #e74c3c;
      color: white;
      border: none;
      padding: 12px 30px;
      border-radius: 12px;
      font-size: 14px;
      cursor: pointer;
      transition: all 0.3s;
    }

    .logout-btn:hover {
      background: #c0392b;
      transform: translateY(-2px);
    }

    .final-message {
      border-top: 1px solid #e1e5e9;
      padding-top: 1.5rem;
      margin-top: 1rem;
    }

    .final-message p {
      color: #fd79a8;
      font-size: 1.2rem;
      font-weight: 600;
      margin: 0;
    }

    @media (max-width: 768px) {
      .felicitacion-card {
        padding: 2rem;
      }
      
      h1 {
        font-size: 2rem;
      }
      
      .celebration-icon {
        font-size: 3rem;
      }
    }
  `]
})
export class FelicitacionComponent {
  constructor(
    public pruebasService: PruebasService,
    private router: Router,
    private authService: AuthService
  ) {}

  abrirWhatsApp() {
    // Cambia este número por el número real del grupo de WhatsApp
    // Formato: +34XXXXXXXXX (sin espacios ni guiones)
    const numeroGrupo = '+34123456789';
    const mensaje = '¡Hola! He completado todas las pruebas del regalo de boda 🎉';
    const url = `https://wa.me/${numeroGrupo}?text=${encodeURIComponent(mensaje)}`;
    
    window.open(url, '_blank');
  }

  reiniciar() {
    this.pruebasService.resetPruebas();
    this.router.navigate(['/pruebas']);
  }

  logout() {
    this.authService.logout();
    this.pruebasService.resetPruebas();
    this.router.navigate(['/']);
  }
}