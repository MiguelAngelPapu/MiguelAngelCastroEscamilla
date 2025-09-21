import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ModalPrimaryComponent } from './modal-primary.component';
import { Component } from '@angular/core'; 


@Component({
  selector: 'button-primary',
  standalone: true,
  template: ''
})
class MockButtonPrimaryComponent {}

describe('ModalPrimaryComponent', () => {
  let component: ModalPrimaryComponent;
  let fixture: ComponentFixture<ModalPrimaryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ModalPrimaryComponent, MockButtonPrimaryComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModalPrimaryComponent);
    component = fixture.componentInstance;

   
    fixture.componentRef.setInput('title', 'Test Modal Title');
    fixture.componentRef.setInput('id', 'test-id');

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

