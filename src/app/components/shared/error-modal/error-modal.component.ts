import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-error-modal',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './error-modal.component.html',
  styleUrl: './error-modal.component.scss'
})
export class ErrorModalComponent {
  @Input() show = false;
  @Input() imageSrc = '/assets/images/novia.png';
  @Input() message = 'Vaya, no ha habido suerte.';
  @Output() closed = new EventEmitter<void>();

  onOverlayClick() {
    this.closed.emit();
  }

  onContentClick(event: Event) {
    event.stopPropagation();
  }

  onClose() {
    this.closed.emit();
  }
}
