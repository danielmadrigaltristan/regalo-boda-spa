import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FloatingFacesComponent } from '../floating-faces/floating-faces.component';
import { AdvancedFloatingFacesComponent } from '../advanced-floating-faces/advanced-floating-faces.component';
import { EmojiFloatingComponent } from '../emoji-floating/emoji-floating.component';

@Component({
  selector: 'app-background-controller',
  standalone: true,
  imports: [CommonModule, FloatingFacesComponent, AdvancedFloatingFacesComponent, EmojiFloatingComponent],
  template: `
    <!-- Control para cambiar tipo de animación -->
    <div class="animation-control" [class.hidden]="!showControls()">
      <button (click)="toggleAnimation()" class="control-btn">
        {{ getAnimationLabel() }}
      </button>
      <button (click)="toggleControls()" class="control-btn">
        {{ showControls() ? '🔒' : '⚙️' }}
      </button>
    </div>

    <!-- Renderizar componente según el tipo -->
    @switch (animationType()) {
      @case ('simple') {
        <app-floating-faces></app-floating-faces>
      }
      @case ('advanced') {
        <app-advanced-floating-faces></app-advanced-floating-faces>
      }
      @case ('emoji') {
        <app-emoji-floating></app-emoji-floating>
      }
    }
  `,
  styles: [`
    .animation-control {
      position: fixed;
      top: 20px;
      right: 20px;
      z-index: 1000;
      transition: opacity 0.3s ease;
      display: flex;
      gap: 5px;
    }

    .animation-control.hidden {
      opacity: 0.3;
    }

    .animation-control:hover {
      opacity: 1;
    }

    .control-btn {
      background: rgba(0, 0, 0, 0.7);
      color: white;
      border: none;
      padding: 8px 12px;
      border-radius: 20px;
      font-size: 12px;
      cursor: pointer;
      transition: all 0.3s ease;
      backdrop-filter: blur(10px);
    }

    .control-btn:hover {
      background: rgba(0, 0, 0, 0.9);
      transform: scale(1.05);
    }
  `]
})
export class BackgroundControllerComponent {
  animationType = signal<'simple' | 'advanced' | 'emoji'>('emoji'); // Empezar con emojis para test
  showControls = signal(true);

  toggleAnimation() {
    const current = this.animationType();
    const next = current === 'emoji' ? 'simple' : 
                 current === 'simple' ? 'advanced' : 'emoji';
    this.animationType.set(next);
  }

  getAnimationLabel(): string {
    switch (this.animationType()) {
      case 'emoji': return '😊 Emojis';
      case 'simple': return '🎯 Simple';
      case 'advanced': return '✨ Avanzada';
      default: return '🎭';
    }
  }

  toggleControls() {
    this.showControls.set(!this.showControls());
  }
}