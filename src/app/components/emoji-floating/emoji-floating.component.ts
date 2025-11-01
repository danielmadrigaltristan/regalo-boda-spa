import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';

interface EmojiFloat {
  id: number;
  emoji: string;
  x: number;
  y: number;
  dx: number;
  dy: number;
  rotation: number;
  rotationSpeed: number;
  size: number;
}

@Component({
  selector: 'app-emoji-floating',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="floating-container">
      @for (item of floatingEmojis; track item.id) {
        <div 
          [style.left.px]="item.x"
          [style.top.px]="item.y"
          [style.transform]="'rotate(' + item.rotation + 'deg) scale(' + item.size + ')'"
          class="floating-emoji"
        >
          {{ item.emoji }}
        </div>
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

    .floating-emoji {
      position: absolute;
      font-size: 60px;
      opacity: 0.3;
      transition: transform 0.1s ease-out;
      user-select: none;
    }

    .floating-emoji:nth-child(odd) {
      opacity: 0.2;
    }

    .floating-emoji:nth-child(even) {
      opacity: 0.4;
    }
  `]
})
export class EmojiFloatingComponent implements OnInit, OnDestroy {
  floatingEmojis: EmojiFloat[] = [];
  private animationId: number = 0;
  private containerWidth = 0;
  private containerHeight = 0;

  // Emojis de novios
  private emojis = ['👰', '🤵', '💕', '💍', '🎉', '🌹'];

  ngOnInit() {
    console.log('🎭 EmojiFloating iniciando...');
    this.updateContainerSize();
    this.createFloatingEmojis();
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

  private createFloatingEmojis() {
    this.floatingEmojis = [];
    const emojiCount = 10;

    for (let i = 0; i < emojiCount; i++) {
      const emoji: EmojiFloat = {
        id: i,
        emoji: this.emojis[i % this.emojis.length],
        x: Math.random() * (this.containerWidth - 100),
        y: Math.random() * (this.containerHeight - 100),
        dx: (Math.random() - 0.5) * 1.5,
        dy: (Math.random() - 0.5) * 1.5,
        rotation: Math.random() * 360,
        rotationSpeed: (Math.random() - 0.5) * 2,
        size: 0.8 + Math.random() * 0.4
      };
      this.floatingEmojis.push(emoji);
    }
  }

  private startAnimation() {
    const animate = () => {
      this.updateEmojis();
      this.animationId = requestAnimationFrame(animate);
    };
    animate();
  }

  private updateEmojis() {
    this.floatingEmojis.forEach(emoji => {
      emoji.x += emoji.dx;
      emoji.y += emoji.dy;

      if (emoji.x <= 0 || emoji.x >= this.containerWidth - 60) {
        emoji.dx = -emoji.dx;
        emoji.x = Math.max(0, Math.min(this.containerWidth - 60, emoji.x));
      }

      if (emoji.y <= 0 || emoji.y >= this.containerHeight - 60) {
        emoji.dy = -emoji.dy;
        emoji.y = Math.max(0, Math.min(this.containerHeight - 60, emoji.y));
      }

      emoji.rotation += emoji.rotationSpeed;
      if (emoji.rotation > 360) emoji.rotation -= 360;
      if (emoji.rotation < 0) emoji.rotation += 360;
    });
  }

  private onResize() {
    this.updateContainerSize();
    this.floatingEmojis.forEach(emoji => {
      if (emoji.x > this.containerWidth - 60) {
        emoji.x = this.containerWidth - 60;
      }
      if (emoji.y > this.containerHeight - 60) {
        emoji.y = this.containerHeight - 60;
      }
    });
  }
}