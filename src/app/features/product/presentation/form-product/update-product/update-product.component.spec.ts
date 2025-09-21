import { ComponentFixture, TestBed } from '@angular/core/testing';
import { UpdateProductComponent } from './update-product.component';


import { Component } from '@angular/core';
import { ActivatedRoute, convertToParamMap, Router } from '@angular/router';
import { UpdateProductFacade } from '../../../application/facades/update-product.facade';
import { of } from 'rxjs';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';


@Component({ selector: 'app-input-primary', standalone: true, template: '' })
class MockInputPrimaryComponent {}

@Component({ selector: 'app-button-primary', standalone: true, template: '' })
class MockButtonPrimaryComponent {}

@Component({ selector: 'app-toast-primary', standalone: true, template: '' })
class MockToastPrimaryComponent {}


describe('UpdateProductComponent', () => {
  let component: UpdateProductComponent;
  let fixture: ComponentFixture<UpdateProductComponent>;
  
  const mockUpdateProductFacade = {

    form: new FormGroup({
      id: new FormControl('initial-id'),
      name: new FormControl(''),
      description: new FormControl(''),
      logo: new FormControl(''),
      date_release: new FormControl(''),
      date_revision: new FormControl('')
    }),

    isEditMode: jasmine.createSpy('isEditMode').and.returnValue(true),
    getProductById: jasmine.createSpy('getProductById'),
  update: jasmine.createSpy('update').and.returnValue(Promise.resolve({ status: 200, message: 'Updated' })),
    cancelEditMode: jasmine.createSpy('cancelEditMode')
  };

  const mockRouter = {
    navigate: jasmine.createSpy('navigate')
  };

  const mockActivatedRoute = {
    paramMap: of(convertToParamMap({ id: '123-from-route' }))
  };


  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        UpdateProductComponent,
        ReactiveFormsModule,
        MockInputPrimaryComponent,
        MockButtonPrimaryComponent,
        MockToastPrimaryComponent
      ],
      providers: [
        { provide: UpdateProductFacade, useValue: mockUpdateProductFacade },
        { provide: Router, useValue: mockRouter },
        { provide: ActivatedRoute, useValue: mockActivatedRoute }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(UpdateProductComponent);
    component = fixture.componentInstance;

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

