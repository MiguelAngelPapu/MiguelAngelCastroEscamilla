import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DropdownPrimaryComponent } from './dropdown-primary.component';

import { Component } from '@angular/core';
import { RouterTestingModule } from '@angular/router/testing';


@Component({
  selector: 'modal-primary',
  standalone: true,
  template: ''
})
class MockModalPrimaryComponent {
  open() {}
}

describe('DropdownPrimaryComponent', () => {
  let component: DropdownPrimaryComponent;
  let fixture: ComponentFixture<DropdownPrimaryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({

      imports: [
        DropdownPrimaryComponent,
        MockModalPrimaryComponent,
        RouterTestingModule
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(DropdownPrimaryComponent);
    component = fixture.componentInstance;

    fixture.componentRef.setInput('id', 'test-123');

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
