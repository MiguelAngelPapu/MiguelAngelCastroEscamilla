import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AddProductComponent } from './add-product.component';

import { Component } from '@angular/core';
import { AddProductFacade } from '../../../application/facades/add-product.facade';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';


@Component({ selector: 'app-input-primary', standalone: true, template: '' })
class MockInputPrimaryComponent {}

@Component({ selector: 'app-button-primary', standalone: true, template: '' })
class MockButtonPrimaryComponent {}

@Component({ selector: 'app-toast-primary', standalone: true, template: '' })
class MockToastPrimaryComponent {}


describe('AddProductComponent', () => {
  let component: AddProductComponent;
  let fixture: ComponentFixture<AddProductComponent>;

  const mockAddProductFacade = {

    form: new FormGroup({
      id: new FormControl(''),
      name: new FormControl(''),
      description: new FormControl(''),
      logo: new FormControl(''),
      date_release: new FormControl(''),
      date_revision: new FormControl('')
    }),
  save: jasmine.createSpy('save').and.returnValue(Promise.resolve({ status: 200, message: 'Success' })),
    reset: jasmine.createSpy('reset')
  };


  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        AddProductComponent,
        ReactiveFormsModule,
        MockInputPrimaryComponent,
        MockButtonPrimaryComponent,
        MockToastPrimaryComponent
      ],
      providers: [
        { provide: AddProductFacade, useValue: mockAddProductFacade }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(AddProductComponent);
    component = fixture.componentInstance;

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
