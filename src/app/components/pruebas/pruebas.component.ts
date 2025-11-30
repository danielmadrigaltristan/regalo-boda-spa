import { Component, signal, effect } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { PruebasService, Prueba } from '../../services/pruebas.service';
import { AuthService } from '../../services/auth.service';
import { FloatingFacesComponent } from '../floating-faces/floating-faces.component';
import { ConfirmationModalComponent } from '../shared/confirmation-modal/confirmation-modal.component';
import { RulesModalComponent } from '../shared/rules-modal/rules-modal.component';
import { ErrorModalComponent } from '../shared/error-modal/error-modal.component';

@Component({
  selector: 'app-pruebas',
  standalone: true,
  imports: [FormsModule, CommonModule, FloatingFacesComponent, ConfirmationModalComponent, RulesModalComponent, ErrorModalComponent],
  template: `
    <div class="pruebas-container">
      @if (pruebaActual()) {
        <div class="prueba-card">
          <div class="header">
            <div class="progress-bar">
              <div class="progress" [style.width.%]="progreso()"></div>
            </div>
            
            <button (click)="confirmarLogout()" class="logout-btn-small" title="Cerrar Sesión">
              <span style="filter: grayscale(100%) brightness(0);">❌</span>
            </button>
          </div>
          
          <h1>{{ pruebaActual()!.titulo }}</h1>
          
          <div class="actions-container">
            <button (click)="mostrarReglas()" class="action-btn btn-rules">
              📜 Ver Reglas
            </button>
            
            <button (click)="probarSuerte()" class="action-btn btn-luck">
              🎲 Probar Suerte
            </button>
          </div>
          
          <form (ngSubmit)="verificarCodigo()" #codigoForm="ngForm">
            <div class="form-group">
              <label for="codigo">Introduce el código:</label>
              <input 
                type="text" 
                id="codigo"
                [(ngModel)]="codigoInput" 
                name="codigo"
                placeholder="Código secreto"
                class="form-input"
                required
              />
            </div>
            
            @if (mostrarExito()) {
              <div class="success-message">
                ¡Correcto! Pasando a la siguiente prueba...
              </div>
            }
            
            <button type="submit" class="submit-btn" [disabled]="!codigoForm.valid">
              ✓ Verificar Código
            </button>
          </form>
          
          <div class="prueba-info">
            <span>Prueba {{ pruebasService.currentPruebaIndex() + 1 }} de {{ pruebasService.getTotalPruebas() }}</span>
          </div>
        </div>
      }
      <!-- Caras flotantes de los novios -->
      <app-floating-faces></app-floating-faces>
    </div>
    
    <!-- Modal de confirmación de logout -->
    <app-confirmation-modal
      [show]="mostrarModal()"
      title="¿Estás seguro?"
      message="¿Quieres cerrar sesión y salir de la aplicación?"
      confirmText="Sí, cerrar sesión"
      cancelText="Cancelar"
      (confirmed)="confirmarCerrarSesion()"
      (cancelled)="cancelarLogout()">
    </app-confirmation-modal>
    
    <!-- Modal de reglas -->
    <app-rules-modal
      [show]="mostrarModalReglas()"
      [title]="pruebaActual()?.titulo || ''"
      [description]="getFormattedDescription()"
      (closed)="cerrarReglas()"
      (understood)="cerrarReglas()">
    </app-rules-modal>
    
    <!-- Modal de error -->
    <app-error-modal
      [show]="mostrarModalError()"
      [imageSrc]="errorImageSrc()"
      message="Vaya, no ha habido suerte."
      (closed)="cerrarModalError()">
    </app-error-modal>
  `,
  styles: [`
    .pruebas-container {
      min-height: 100vh;
      background: linear-gradient(135deg, #74b9ff 0%, #0984e3 100%);
      padding: 20px;
      display: flex;
      align-items: center;
      justify-content: center;
    }

    .prueba-card {
      background: white;
      padding: 2rem;
      border-radius: 15px;
      box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
      max-width: 600px;
      width: 100%;
      position: relative;
      z-index: 10;
    }

    .header {
      display: flex;
      align-items: center;
      gap: 1rem;
      margin-bottom: 2rem;
    }

    .progress-bar {
      flex: 1;
      height: 8px;
      background: #e1e5e9;
      border-radius: 4px;
      overflow: hidden;
    }

    .progress {
      height: 100%;
      background: linear-gradient(90deg, #00b894, #00cec9);
      transition: width 0.5s ease;
    }

    .logout-btn-small {
      background: #e74c3c;
      color: white;
      border: none;
      padding: 8px 12px;
      border-radius: 50%;
      font-size: 16px;
      cursor: pointer;
      transition: all 0.3s;
      min-width: 40px;
      height: 40px;
      display: flex;
      align-items: center;
      justify-content: center;
    }

    .logout-btn-small:hover {
      background: #c0392b;
      transform: translateY(-2px);
    }

    h1 {
      color: #2d3436;
      text-align: center;
      margin-bottom: 2rem;
      font-size: 2rem;
    }

    .actions-container {
      display: flex;
      gap: 1rem;
      margin-bottom: 2rem;
    }

    .action-btn {
      flex: 1;
      padding: 12px 20px;
      border: none;
      border-radius: 8px;
      font-size: 16px;
      font-weight: 600;
      cursor: pointer;
      transition: all 0.3s;
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 0.5rem;
    }

    .btn-rules {
      background: linear-gradient(135deg, #a29bfe 0%, #6c5ce7 100%);
      color: white;

      &:hover {
        transform: translateY(-2px);
        box-shadow: 0 5px 15px rgba(108, 92, 231, 0.3);
      }
    }

    .btn-luck {
      background: linear-gradient(135deg, #fdcb6e 0%, #e17055 100%);
      color: white;

      &:hover {
        transform: translateY(-2px);
        box-shadow: 0 5px 15px rgba(225, 112, 85, 0.3);
      }
    }

    .descripcion {
      background: #f8f9fa;
      padding: 1.5rem;
      border-radius: 10px;
      margin-bottom: 2rem;
      border-left: 4px solid #74b9ff;
    }

    .descripcion p {
      margin: 0;
      line-height: 1.6;
      color: #2d3436;
    }

    .form-group {
      margin-bottom: 1rem;
    }

    label {
      display: block;
      margin-bottom: 8px;
      color: #2d3436;
      font-weight: 600;
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
      border-color: #74b9ff;
    }

    .form-input.error {
      border-color: #e74c3c;
    }

    .submit-btn {
      background: linear-gradient(135deg, #74b9ff 0%, #0984e3 100%);
      color: white;
      border: none;
      padding: 12px 30px;
      border-radius: 8px;
      font-size: 16px;
      cursor: pointer;
      transition: transform 0.2s;
      width: 100%;
      margin-bottom: 1rem;
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
      text-align: center;
    }

    .success-message {
      color: #00b894;
      background: #e6fff9;
      padding: 10px;
      border-radius: 5px;
      margin-bottom: 1rem;
      font-size: 14px;
      text-align: center;
    }

    .prueba-info {
      text-align: center;
      color: #74b9ff;
      font-weight: 600;
    }
  `]
})
export class PruebasComponent {
  codigoInput = '';
  mostrarExito = signal(false);
  mostrarModal = signal(false);
  mostrarModalReglas = signal(false);
  mostrarModalError = signal(false);
  errorImageSrc = signal('/assets/images/error/cepi.png');
  pruebaActual = signal<Prueba | null>(null);

  private codigosValidos = ['BALON10', 'MUSIC15', 'DANCE2M', 'LOVE123'];
  private errorImages = ['/assets/images/error/cepi.png'];

  constructor(
    public pruebasService: PruebasService,
    private router: Router,
    private authService: AuthService
  ) {
    // Actualizar la prueba actual cuando cambie el índice
    effect(() => {
      this.pruebaActual.set(this.pruebasService.getPruebaActual());
    });

    // Navegar a felicitación cuando todas las pruebas estén completadas
    effect(() => {
      if (this.pruebasService.allCompleted()) {
        setTimeout(() => {
          this.router.navigate(['/felicitacion']);
        }, 2000);
      }
    });
  }

  progreso(): number {
    return (this.pruebasService.getPruebasCompletadas() / this.pruebasService.getTotalPruebas()) * 100;
  }

  getFormattedDescription(): string {
    const desc = this.pruebaActual()?.descripcion || '';
    return desc.replace(/\\n/g, '\n');
  }

  mostrarReglas() {
    this.mostrarModalReglas.set(true);
  }

  cerrarReglas() {
    this.mostrarModalReglas.set(false);
  }

  probarSuerte() {
    const codigoGenerado = this.generarCodigoAleatorio();
    this.codigoInput = codigoGenerado;
  }

  generarCodigoAleatorio(): string {
    const caracteres = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let codigo = '';
    
    do {
      codigo = '';
      const longitud = Math.floor(Math.random() * 3) + 6; // Entre 6 y 8 caracteres
      for (let i = 0; i < longitud; i++) {
        codigo += caracteres.charAt(Math.floor(Math.random() * caracteres.length));
      }
    } while (this.codigosValidos.includes(codigo));
    
    return codigo;
  }

  verificarCodigo() {
    this.mostrarExito.set(false);

    if (this.pruebasService.verificarCodigo(this.codigoInput)) {
      this.mostrarExito.set(true);
      this.codigoInput = '';
    } else {
      // Seleccionar imagen aleatoria de error
      const randomIndex = Math.floor(Math.random() * this.errorImages.length);
      this.errorImageSrc.set(this.errorImages[randomIndex]);
      this.mostrarModalError.set(true);
      this.codigoInput = '';
    }
  }

  cerrarModalError() {
    this.mostrarModalError.set(false);
  }

  confirmarLogout() {
    this.mostrarModal.set(true);
  }

  cancelarLogout() {
    this.mostrarModal.set(false);
  }

  confirmarCerrarSesion() {
    this.mostrarModal.set(false);
    this.authService.logout();
    this.pruebasService.resetPruebas();
    this.router.navigate(['/']);
  }

  logout() {
    this.confirmarLogout();
  }
}