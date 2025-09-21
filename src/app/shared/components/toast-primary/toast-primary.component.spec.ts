import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ToastPrimaryComponent } from './toast-primary.component';

describe('ToastPrimaryComponent', () => {
  let component: ToastPrimaryComponent;
  let fixture: ComponentFixture<ToastPrimaryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ToastPrimaryComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ToastPrimaryComponent);
    component = fixture.componentInstance;
  
    fixture.componentRef.setInput('text', 'This is a test message');
    fixture.componentRef.setInput('isSuccess', true);

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
