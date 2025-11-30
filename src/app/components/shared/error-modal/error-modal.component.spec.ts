import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';

import { ErrorModalComponent } from './error-modal.component';

describe('ErrorModalComponent', () => {
  let component: ErrorModalComponent;
  let fixture: ComponentFixture<ErrorModalComponent>;
  let compiled: DebugElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ErrorModalComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ErrorModalComponent);
    component = fixture.componentInstance;
    compiled = fixture.debugElement;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have default input values', () => {
    expect(component.imageSrc).toBe('/assets/images/novia.png');
    expect(component.message).toBe('Vaya, no ha habido suerte.');
    expect(component.show).toBe(false);
  });

  it('should not display modal when show is false', () => {
    component.show = false;
    fixture.detectChanges();
    const overlay = compiled.query(By.css('.modal-overlay'));
    expect(overlay).toBeFalsy();
  });

  it('should display modal when show is true', () => {
    component.show = true;
    fixture.detectChanges();
    const overlay = compiled.query(By.css('.modal-overlay'));
    expect(overlay).toBeTruthy();
  });

  it('should display custom message and image', () => {
    component.show = true;
    component.message = 'Test Message';
    component.imageSrc = '/test.png';
    fixture.detectChanges();
    
    const message = compiled.query(By.css('h2')).nativeElement;
    const image = compiled.query(By.css('img')).nativeElement;
    
    expect(message.textContent).toBe('Test Message');
    expect(image.src).toContain('/test.png');
  });

  it('should emit closed event when close button is clicked', () => {
    component.show = true;
    fixture.detectChanges();
    
    spyOn(component.closed, 'emit');
    const button = compiled.query(By.css('.btn-close')).nativeElement;
    button.click();
    
    expect(component.closed.emit).toHaveBeenCalled();
  });

  it('should emit closed event when overlay is clicked', () => {
    component.show = true;
    fixture.detectChanges();
    
    spyOn(component.closed, 'emit');
    const overlay = compiled.query(By.css('.modal-overlay')).nativeElement;
    overlay.click();
    
    expect(component.closed.emit).toHaveBeenCalled();
  });

  it('should stop event propagation when modal content is clicked', () => {
    component.show = true;
    fixture.detectChanges();
    
    const event = new Event('click');
    spyOn(event, 'stopPropagation');
    
    component.onContentClick(event);
    
    expect(event.stopPropagation).toHaveBeenCalled();
  });
});
