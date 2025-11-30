import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';

import { RulesModalComponent } from './rules-modal.component';

describe('RulesModalComponent', () => {
  let component: RulesModalComponent;
  let fixture: ComponentFixture<RulesModalComponent>;
  let compiled: DebugElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RulesModalComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RulesModalComponent);
    component = fixture.componentInstance;
    compiled = fixture.debugElement;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have default input values', () => {
    expect(component.title).toBe('Reglas de la Prueba');
    expect(component.description).toBe('');
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

  it('should display custom title and description', () => {
    component.show = true;
    component.title = 'Test Title';
    component.description = 'Test Description';
    fixture.detectChanges();
    
    const title = compiled.query(By.css('h2')).nativeElement;
    const description = compiled.query(By.css('.modal-body p')).nativeElement;
    
    expect(title.textContent).toBe('Test Title');
    expect(description.textContent).toBe('Test Description');
  });

  it('should show scroll hint when not scrolled to bottom', () => {
    component.show = true;
    component.hasScrolledToBottom.set(false);
    fixture.detectChanges();
    
    const hint = compiled.query(By.css('.scroll-hint'));
    expect(hint).toBeTruthy();
  });

  it('should show understood button when scrolled to bottom', () => {
    component.show = true;
    component.hasScrolledToBottom.set(true);
    fixture.detectChanges();
    
    const button = compiled.query(By.css('.btn-understood'));
    expect(button).toBeTruthy();
  });

  it('should emit understood event when button is clicked', () => {
    component.show = true;
    component.hasScrolledToBottom.set(true);
    fixture.detectChanges();
    
    spyOn(component.understood, 'emit');
    const button = compiled.query(By.css('.btn-understood')).nativeElement;
    button.click();
    
    expect(component.understood.emit).toHaveBeenCalled();
  });

  it('should update hasScrolledToBottom when scrolled to bottom', () => {
    const mockEvent = {
      target: {
        scrollHeight: 1000,
        scrollTop: 900,
        clientHeight: 100
      }
    } as any;
    
    component.onScroll(mockEvent);
    
    expect(component.hasScrolledToBottom()).toBe(true);
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
