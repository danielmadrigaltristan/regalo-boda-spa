import { Component, signal, effect } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { PruebasService, Prueba } from '../../services/pruebas.service';

@Component({
  selector: 'app-pruebas',
  standalone: true,
  imports: [FormsModule, CommonModule],
  template: `
    <div class="pruebas-container">
      @if (pruebaActual()) {
        <div class="prueba-card">
          <div class="progress-bar">
            <div class="progress" [style.width.%]="progreso()"></div>
          </div>
          
          <h1>{{ pruebaActual()!.titulo }}</h1>
          
          <div class="descripcion">
            <p>{{ pruebaActual()!.descripcion }}</p>
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
                [class.error]="mostrarError()"
              />
            </div>
            
            @if (mostrarError()) {
              <div class="error-message">
                Código incorrecto. ¡Inténtalo de nuevo!
              </div>
            }
            
            @if (mostrarExito()) {
              <div class="success-message">
                ¡Correcto! Pasando a la siguiente prueba...
              </div>
            }
            
            <button type="submit" class="submit-btn" [disabled]="!codigoForm.valid">
              Verificar Código
            </button>
          </form>
          
          <div class="prueba-info">
            <span>Prueba {{ pruebasService.currentPruebaIndex() + 1 }} de {{ pruebasService.getTotalPruebas() }}</span>
          </div>
        </div>
      }
    </div>
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
    }

    .progress-bar {
      width: 100%;
      height: 8px;
      background: #e1e5e9;
      border-radius: 4px;
      margin-bottom: 2rem;
      overflow: hidden;
    }

    .progress {
      height: 100%;
      background: linear-gradient(90deg, #00b894, #00cec9);
      transition: width 0.5s ease;
    }

    h1 {
      color: #2d3436;
      text-align: center;
      margin-bottom: 2rem;
      font-size: 2rem;
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
  mostrarError = signal(false);
  mostrarExito = signal(false);
  pruebaActual = signal<Prueba | null>(null);

  constructor(
    public pruebasService: PruebasService,
    private router: Router
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

  verificarCodigo() {
    this.mostrarError.set(false);
    this.mostrarExito.set(false);

    if (this.pruebasService.verificarCodigo(this.codigoInput)) {
      this.mostrarExito.set(true);
      this.codigoInput = '';
    } else {
      this.mostrarError.set(true);
      this.codigoInput = '';
    }
  }
}