import { Component, OnInit, OnDestroy, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';

interface FloatingImage {
  id: number;
  src: string;
  x: number;
  y: number;
  dx: number;
  dy: number;
  rotation: number;
  rotationSpeed: number;
  size: number;
}

@Component({
  selector: 'app-floating-faces',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="floating-container">
      @for (image of floatingImages; track image.id) {
        <img 
          [src]="image.src"
          [ngStyle]="getImageStyle(image)"
          class="floating-image"
          alt="Cara de novio"
          (load)="onImageLoad()"
          (error)="onImageError()"
        />
      }
    </div>
  `,
  styles: [`
    .floating-container {
      position: fixed;
      top: 0;
      left: 0;
      width: 100vw;
      height: 100vh;
      pointer-events: none;
      z-index: 0;
      overflow: hidden;
    }

    .floating-image {
      /* Los estilos base se aplican dinámicamente con getImageStyle() */
    }

    .floating-image:hover {
      transform: scale(1.15) !important;
      transition: all 0.3s ease !important;
    }
  `]
})
export class FloatingFacesComponent implements OnInit, OnDestroy {
  floatingImages: FloatingImage[] = [];
  private animationId: number = 0;
  private containerWidth = 0;
  private containerHeight = 0;

  // Rutas de las imágenes - cambiar por las rutas reales de tus imágenes
  private imagePaths = [
    'assets/images/novio.png',   // Cambia por el nombre real de tu imagen del novio
    'assets/images/novia.png'    // Cambia por el nombre real de tu imagen de la novia
  ];

  constructor(private cdr: ChangeDetectorRef) {}

  ngOnInit() {
    console.log('🎭 FloatingFaces iniciando...');
    console.log('📐 Tamaño del contenedor:', window.innerWidth, 'x', window.innerHeight);
    this.updateContainerSize();
    this.createFloatingImages();
    this.startAnimation();
    window.addEventListener('resize', this.onResize.bind(this));
    console.log(`📷 ${this.floatingImages.length} imágenes creadas`);
    console.log('🎯 Rutas de imágenes:', this.imagePaths);
    console.log('🎪 Primera imagen:', this.floatingImages[0]);
  }

  ngOnDestroy() {
    if (this.animationId) {
      cancelAnimationFrame(this.animationId);
    }
    window.removeEventListener('resize', this.onResize.bind(this));
  }

  private updateContainerSize() {
    this.containerWidth = window.innerWidth;
    this.containerHeight = window.innerHeight;
  }

  private createFloatingImages() {
    this.floatingImages = [];
    const imageCount = 8; // Total de imágenes flotantes

    for (let i = 0; i < imageCount; i++) {
      const image: FloatingImage = {
        id: i,
        src: this.imagePaths[i % this.imagePaths.length], // Alternar entre las dos imágenes
        x: Math.random() * (this.containerWidth - 100),
        y: Math.random() * (this.containerHeight - 100),
        dx: (Math.random() - 0.5) * 2, // Velocidad horizontal (-1 a 1)
        dy: (Math.random() - 0.5) * 2, // Velocidad vertical (-1 a 1)
        rotation: Math.random() * 360,
        rotationSpeed: (Math.random() - 0.5) * 2, // Velocidad de rotación
        size: 0.8 + Math.random() * 0.4 // Tamaño entre 0.8 y 1.2
      };
      this.floatingImages.push(image);
    }
  }

  private startAnimation() {
    const animate = () => {
      this.updateImages();
      this.animationId = requestAnimationFrame(animate);
    };
    animate();
  }

  private updateImages() {
    let hasChanges = false;
    
    this.floatingImages.forEach(image => {
      // Actualizar posición
      const oldX = image.x;
      const oldY = image.y;
      const oldRotation = image.rotation;
      
      image.x += image.dx;
      image.y += image.dy;

      // Rebotar en los bordes
      if (image.x <= 0 || image.x >= this.containerWidth - 80) {
        image.dx = -image.dx;
        image.x = Math.max(0, Math.min(this.containerWidth - 80, image.x));
      }

      if (image.y <= 0 || image.y >= this.containerHeight - 80) {
        image.dy = -image.dy;
        image.y = Math.max(0, Math.min(this.containerHeight - 80, image.y));
      }

      // Actualizar rotación
      image.rotation += image.rotationSpeed;
      if (image.rotation > 360) image.rotation -= 360;
      if (image.rotation < 0) image.rotation += 360;
      
      // Verificar si hubo cambios
      if (oldX !== image.x || oldY !== image.y || oldRotation !== image.rotation) {
        hasChanges = true;
      }
    });
    
    // Forzar detección de cambios solo si hubo cambios
    if (hasChanges) {
      this.cdr.detectChanges();
    }
  }

  getImageStyle(image: FloatingImage): any {
    const style = {
      position: 'absolute',
      left: `${image.x}px`,
      top: `${image.y}px`,
      transform: `rotate(${image.rotation}deg) scale(${image.size})`,
      width: '80px',
      height: '80px',
      opacity: '1', // Sin opacidad - completamente visible
      'object-fit': 'contain',
      transition: 'none',
      'z-index': '0' // Nivel neutro
    };
    
    // Debug cada vez que se genera el estilo (remover en producción)
    // if (image.id === 0) {
    //   console.log('🎨 Estilo para imagen 0:', style);
    // }
    
    return style;
  }

  onImageLoad() {
    console.log('Imagen cargada correctamente');
  }

  onImageError() {
    console.log('Error al cargar la imagen');
  }

  private onResize() {
    this.updateContainerSize();
    // Reposicionar imágenes que estén fuera de los nuevos límites
    this.floatingImages.forEach(image => {
      if (image.x > this.containerWidth - 80) {
        image.x = this.containerWidth - 80;
      }
      if (image.y > this.containerHeight - 80) {
        image.y = this.containerHeight - 80;
      }
    });
  }
}