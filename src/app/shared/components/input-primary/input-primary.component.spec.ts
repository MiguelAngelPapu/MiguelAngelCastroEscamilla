import { ComponentFixture, TestBed } from '@angular/core/testing';
import { InputPrimaryComponent } from './input-primary.component';
import { FormControl } from '@angular/forms';

describe('InputPrimaryComponent', () => {
  let component: InputPrimaryComponent;
  let fixture: ComponentFixture<InputPrimaryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InputPrimaryComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InputPrimaryComponent);
    component = fixture.componentInstance;

    const testControl = new FormControl('');
    fixture.componentRef.setInput('control', testControl);
    fixture.componentRef.setInput('label', 'Test Label');


    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
