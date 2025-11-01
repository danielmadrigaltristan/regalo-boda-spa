import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-image-test',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="test-container">
      <h3>Test de Imágenes</h3>
      <div class="image-grid">
        <div class="image-item">
          <h4>Novio</h4>
          <img src="assets/images/novio1.svg" alt="Novio" class="test-image" 
               (load)="onImageLoad('novio')" 
               (error)="onImageError('novio', $event)">
        </div>
        <div class="image-item">
          <h4>Novia</h4>
          <img src="assets/images/novia1.svg" alt="Novia" class="test-image"
               (load)="onImageLoad('novia')" 
               (error)="onImageError('novia', $event)">
        </div>
      </div>
      <div class="status">
        <p *ngFor="let status of loadStatus">{{ status }}</p>
      </div>
    </div>
  `,
  styles: [`
    .test-container {
      position: fixed;
      top: 10px;
      left: 10px;
      background: rgba(255, 255, 255, 0.9);
      padding: 10px;
      border-radius: 8px;
      border: 2px solid #ccc;
      z-index: 9999;
      max-width: 300px;
    }

    .image-grid {
      display: flex;
      gap: 10px;
      margin: 10px 0;
    }

    .image-item {
      text-align: center;
    }

    .test-image {
      width: 80px;
      height: 80px;
      border: 2px solid #ddd;
      border-radius: 50%;
      object-fit: cover;
    }

    h3, h4 {
      margin: 5px 0;
      font-size: 14px;
    }

    .status {
      font-size: 12px;
      color: #666;
    }
  `]
})
export class ImageTestComponent {
  loadStatus: string[] = [];

  onImageLoad(image: string) {
    this.loadStatus.push(`✅ ${image} cargada correctamente`);
    console.log(`Imagen ${image} cargada`);
  }

  onImageError(image: string, event: any) {
    this.loadStatus.push(`❌ Error cargando ${image}`);
    console.error(`Error cargando imagen ${image}:`, event);
  }
}