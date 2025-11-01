import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';

interface AdvancedFloatingImage {
  id: number;
  src: string;
  x: number;
  y: number;
  dx: number;
  dy: number;
  rotation: number;
  rotationSpeed: number;
  size: number;
  opacity: number;
  animationType: 'bounce' | 'float' | 'spiral';
  spiralAngle?: number;
  spiralRadius?: number;
  originalX?: number;
  originalY?: number;
  pulsePhase?: number;
}

@Component({
  selector: 'app-advanced-floating-faces',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="floating-container">
      @for (image of floatingImages; track image.id) {
        <img 
          [src]="image.src"
          [style.left.px]="image.x"
          [style.top.px]="image.y"
          [style.transform]="getTransform(image)"
          [style.opacity]="image.opacity"
          class="floating-image"
          [class]="'anim-' + image.animationType"
          alt="Cara de novio"
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
      z-index: -1;
      overflow: hidden;
    }

    .floating-image {
      position: absolute;
      width: 60px;
      height: 60px;
      border-radius: 50%;
      object-fit: cover;
      border: 2px solid rgba(255, 255, 255, 0.2);
      box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
      transition: all 0.3s ease;
    }

    .anim-bounce {
      filter: hue-rotate(0deg) brightness(1.1);
    }

    .anim-float {
      filter: hue-rotate(30deg) brightness(0.9);
    }

    .anim-spiral {
      filter: hue-rotate(60deg) brightness(1.2);
    }

    .floating-image:hover {
      transform: scale(1.2) !important;
      opacity: 0.6 !important;
    }
  `]
})
export class AdvancedFloatingFacesComponent implements OnInit, OnDestroy {
  floatingImages: AdvancedFloatingImage[] = [];
  private animationId: number = 0;
  private containerWidth = 0;
  private containerHeight = 0;
  private frameCount = 0;

  // Rutas de las imágenes
  private imagePaths = [
    'assets/images/novio1.svg',   // Cambia por novio1.jpeg cuando tengas la imagen real
    'assets/images/novia1.svg'    // Cambia por novia1.jpeg cuando tengas la imagen real
  ];

  ngOnInit() {
    this.updateContainerSize();
    this.createAdvancedFloatingImages();
    this.startAnimation();
    window.addEventListener('resize', this.onResize.bind(this));
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

  private createAdvancedFloatingImages() {
    this.floatingImages = [];
    const imageCount = 12;
    const animationTypes: ('bounce' | 'float' | 'spiral')[] = ['bounce', 'float', 'spiral'];

    for (let i = 0; i < imageCount; i++) {
      const animationType = animationTypes[i % animationTypes.length];
      const x = Math.random() * (this.containerWidth - 100);
      const y = Math.random() * (this.containerHeight - 100);

      const image: AdvancedFloatingImage = {
        id: i,
        src: this.imagePaths[i % this.imagePaths.length],
        x: x,
        y: y,
        dx: (Math.random() - 0.5) * 1.5,
        dy: (Math.random() - 0.5) * 1.5,
        rotation: Math.random() * 360,
        rotationSpeed: (Math.random() - 0.5) * 1,
        size: 0.6 + Math.random() * 0.6, // 0.6 a 1.2
        opacity: 0.1 + Math.random() * 0.15, // 0.1 a 0.25
        animationType: animationType,
        spiralAngle: Math.random() * Math.PI * 2,
        spiralRadius: 50 + Math.random() * 100,
        originalX: x,
        originalY: y,
        pulsePhase: Math.random() * Math.PI * 2
      };
      this.floatingImages.push(image);
    }
  }

  private startAnimation() {
    const animate = () => {
      this.frameCount++;
      this.updateAdvancedImages();
      this.animationId = requestAnimationFrame(animate);
    };
    animate();
  }

  private updateAdvancedImages() {
    const time = this.frameCount * 0.01;

    this.floatingImages.forEach((image, index) => {
      switch (image.animationType) {
        case 'bounce':
          // Movimiento rebotante
          image.x += image.dx;
          image.y += image.dy;

          if (image.x <= 0 || image.x >= this.containerWidth - 60) {
            image.dx = -image.dx;
          }
          if (image.y <= 0 || image.y >= this.containerHeight - 60) {
            image.dy = -image.dy;
          }
          break;

        case 'float':
          // Movimiento flotante suave
          image.x += Math.sin(time + index) * 0.5;
          image.y += Math.cos(time + index) * 0.3;
          
          // Mantener dentro de los límites
          image.x = Math.max(0, Math.min(this.containerWidth - 60, image.x));
          image.y = Math.max(0, Math.min(this.containerHeight - 60, image.y));
          break;

        case 'spiral':
          // Movimiento en espiral
          if (image.spiralAngle !== undefined && image.spiralRadius !== undefined && 
              image.originalX !== undefined && image.originalY !== undefined) {
            image.spiralAngle += 0.02;
            image.x = image.originalX + Math.cos(image.spiralAngle) * image.spiralRadius;
            image.y = image.originalY + Math.sin(image.spiralAngle) * image.spiralRadius;

            // Reposicionar si sale de pantalla
            if (image.x < 0 || image.x > this.containerWidth - 60 || 
                image.y < 0 || image.y > this.containerHeight - 60) {
              image.originalX = Math.random() * (this.containerWidth - 100);
              image.originalY = Math.random() * (this.containerHeight - 100);
            }
          }
          break;
      }

      // Actualizar rotación
      image.rotation += image.rotationSpeed;

      // Efecto de pulso en la opacidad
      if (image.pulsePhase !== undefined) {
        image.pulsePhase += 0.03;
        const baseOpacity = 0.1 + Math.random() * 0.1;
        image.opacity = baseOpacity + Math.sin(image.pulsePhase) * 0.05;
      }
    });
  }

  getTransform(image: AdvancedFloatingImage): string {
    return `rotate(${image.rotation}deg) scale(${image.size})`;
  }

  private onResize() {
    this.updateContainerSize();
    // Reposicionar imágenes fuera de pantalla
    this.floatingImages.forEach(image => {
      if (image.x > this.containerWidth - 60) {
        image.x = this.containerWidth - 60;
        if (image.originalX !== undefined) image.originalX = image.x;
      }
      if (image.y > this.containerHeight - 60) {
        image.y = this.containerHeight - 60;
        if (image.originalY !== undefined) image.originalY = image.y;
      }
    });
  }
}