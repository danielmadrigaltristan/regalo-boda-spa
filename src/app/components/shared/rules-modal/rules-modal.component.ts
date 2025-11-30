import { Component, Input, Output, EventEmitter, signal, effect } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-rules-modal',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './rules-modal.component.html',
  styleUrl: './rules-modal.component.scss'
})
export class RulesModalComponent {
  @Input() show = false;
  @Input() title = 'Reglas de la Prueba';
  @Input() description = '';
  @Output() closed = new EventEmitter<void>();
  @Output() understood = new EventEmitter<void>();

  hasScrolledToBottom = signal(false);

  onScroll(event: Event) {
    const element = event.target as HTMLElement;
    const threshold = 5;
    const hasReachedBottom = element.scrollHeight - element.scrollTop - element.clientHeight < threshold;
    
    if (hasReachedBottom) {
      this.hasScrolledToBottom.set(true);
    }
  }

  onOverlayClick() {
    if (this.hasScrolledToBottom()) {
      this.closed.emit();
    }
  }

  onContentClick(event: Event) {
    event.stopPropagation();
  }

  onClose() {
    if (this.hasScrolledToBottom()) {
      this.closed.emit();
    }
  }

  onUnderstood() {
    this.understood.emit();
  }
}
