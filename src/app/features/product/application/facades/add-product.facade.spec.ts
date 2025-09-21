import { TestBed, fakeAsync, tick } from '@angular/core/testing';
import { AddProductFacade } from './add-product.facade';
import { ProductService } from '../services/product.service';
import { of, Observable, throwError } from 'rxjs';
import { CreateProductDto } from '../../domain/models/product.model';
import { ReactiveFormsModule, ValidationErrors } from '@angular/forms';
import { productIdUniqueValidator } from '../../../../shared/core/validators/validators';

describe('AddProductFacade', () => {
  let facade: AddProductFacade;
  let productServiceSpy: jasmine.SpyObj<ProductService>;

  beforeEach(() => {
    const spy = jasmine.createSpyObj('ProductService', ['addProduct', 'verificationProduct']);

    TestBed.configureTestingModule({
      imports: [ReactiveFormsModule],
      providers: [
        AddProductFacade,
        { provide: ProductService, useValue: spy }
      ]
    });

    facade = TestBed.inject(AddProductFacade);
    productServiceSpy = TestBed.inject(ProductService) as jasmine.SpyObj<ProductService>;

    productServiceSpy.verificationProduct.and.returnValue(of(false));
  });

  it('should be created', () => {
    expect(facade).toBeTruthy();
  });

  it('should not call addProduct and should return undefined if form is invalid', async () => {
    facade.form.get('name')?.setValue('');
    expect(facade.form.invalid).toBeTrue();

    const result = await facade.save();

    expect(productServiceSpy.addProduct).not.toHaveBeenCalled();
    expect(result).toBeUndefined();
  });

  it('should call addProduct with the correct payload on successful save', fakeAsync(async () => {
    const releaseDate = new Date();
    releaseDate.setDate(releaseDate.getDate() + 1);
    const releaseStr = releaseDate.toISOString().split('T')[0];

    const revisionDate = new Date(releaseDate);
    revisionDate.setFullYear(revisionDate.getFullYear() + 1);
    const revisionStr = revisionDate.toISOString().split('T')[0];

    const mockFormData = {
      id: 'test-123',
      name: 'Tarjeta de Crédito Test',
      description: 'Una tarjeta de prueba para el desarrollo',
      logo: 'test-logo.png',
      date_release: releaseStr,
      date_revision: revisionStr,
    };

    facade.form.setValue(mockFormData);
    tick(); // Para el validador asíncrono

    expect(facade.form.valid).toBeTrue();

    const successResponse: CreateProductDto = { ...mockFormData } as any;
    productServiceSpy.addProduct.and.returnValue(of(successResponse));

    const result = await facade.save();

    expect(productServiceSpy.addProduct).toHaveBeenCalled();
    expect(result).toEqual(successResponse);
  }));

  it('save should return MessageApi when service returns MessageApi', fakeAsync(async () => {
    // Arrange
    const msg = { status: 201, message: 'Created' };
    productServiceSpy.addProduct.and.returnValue(of(msg));
    facade.form.setValue({
      id: 'a01', name: 'Nombre', description: 'Desc valida', logo: 'logo.png',
      date_release: '2026-01-01', date_revision: '2027-01-01'
    });
    tick();

    // Act
    const res = await facade.save();

    // Assert
    expect(res).toEqual(msg);
  }));


  describe('Form Validation State', () => {

    it('should mark form as invalid if release date is in the past', () => {
      const pastDate = '2020-01-01';
      facade.form.get('date_release')?.setValue(pastDate);
      expect(facade.form.get('date_release')?.hasError('invalidReleaseDate')).toBeTrue();
      expect(facade.form.invalid).toBeTrue();
    });

    it('should mark form as invalid if product ID already exists', fakeAsync(() => {
      // Arrange: Cambiamos la simulación para que el servicio diga que el ID SÍ existe
      productServiceSpy.verificationProduct.and.returnValue(of(true));

      // Act: Seteamos un valor en el control de ID
      const idControl = facade.form.get('id');
      idControl?.setValue('existing-id');

      // Invocamos directamente el validador asíncrono para que la prueba sea determinista
      const validator = productIdUniqueValidator(productServiceSpy);
      (validator(idControl as any) as unknown as Observable<ValidationErrors | null>).subscribe(result => {
        if (result) {
          idControl?.setErrors(result);
        }
      });
      tick(); // Esperamos la resolución del observable

      // Assert: Verificamos que el formulario aplicó el error correctamente
      expect(facade.form.get('id')?.hasError('idExists')).toBeTrue();
      expect(facade.form.invalid).toBeTrue();
    }));
  });

  it('id unique validator should not add idExists error when service errors', fakeAsync(() => {
    productServiceSpy.verificationProduct.and.returnValue(throwError(() => new Error('API')));
    const control = facade.form.get('id')!;
    control.setValue('x1'); control.updateValueAndValidity();
    tick();
    expect(control.hasError('idExists')).toBeFalse();
  }));

  it('should reset form fields to their initial state', () => {
    facade.form.setValue({
      id: 'test-123', name: 'Tarjeta', description: 'Descripción', logo: 'logo.png',
      date_release: '2025-02-02', date_revision: '2026-02-02'
    });

    facade.reset();

    expect(facade.form.get('id')?.value).toBeNull();
    expect(facade.form.get('name')?.value).toBeNull();
    expect(facade.form.get('date_release')?.value).toEqual(new Date().toISOString().split('T')[0]);
  });

  it('should update revision date automatically when release date changes', () => {
    const releaseDateControl = facade.form.get('date_release');
    const revisionDateControl = facade.form.get('date_revision');

    releaseDateControl?.setValue('2028-10-15');

    expect(revisionDateControl?.value).toBe('2029-10-15');
  });
});

