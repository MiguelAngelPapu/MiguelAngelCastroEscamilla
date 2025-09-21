import { FORM_ERROR_MESSAGES } from './form-errors';

describe('FORM_ERROR_MESSAGES Constant', () => {

  it('should be defined and be an object', () => {
    expect(FORM_ERROR_MESSAGES).toBeDefined();
    expect(typeof FORM_ERROR_MESSAGES).toBe('object');
  });

  describe('for the "id" control', () => {
    it('should have the correct messages for all validation rules', () => {
      const idErrors = FORM_ERROR_MESSAGES['id'];
      expect(idErrors).toBeDefined();
      expect(idErrors['required']).toBe('El ID es obligatorio');
      expect(idErrors['minlength']).toBe('Mínimo 3 caracteres');
      expect(idErrors['maxlength']).toBe('Máximo 10 caracteres');
      expect(idErrors['idExists']).toBe('El ID ya existe');
    });
  });

  describe('for the "name" control', () => {
    it('should have the correct messages for all validation rules', () => {
      const nameErrors = FORM_ERROR_MESSAGES['name'];
      expect(nameErrors).toBeDefined();
      expect(nameErrors['required']).toBe('El nombre es obligatorio');
      expect(nameErrors['minlength']).toBe('Mínimo 5 caracteres');
      expect(nameErrors['maxlength']).toBe('Máximo 100 caracteres');
    });
  });

  describe('for the "description" control', () => {
    it('should have the correct messages for all validation rules', () => {
      const descriptionErrors = FORM_ERROR_MESSAGES['description'];
      expect(descriptionErrors).toBeDefined();
      expect(descriptionErrors['required']).toBe('La descripción es obligatoria');
      expect(descriptionErrors['minlength']).toBe('Mínimo 10 caracteres');
      expect(descriptionErrors['maxlength']).toBe('Máximo 200 caracteres');
    });
  });

  describe('for the "logo" control', () => {
    it('should have the correct message for the "required" rule', () => {
      const logoErrors = FORM_ERROR_MESSAGES['logo'];
      expect(logoErrors).toBeDefined();
      expect(logoErrors['required']).toBe('El logo es obligatorio');
    });
  });

  describe('for the "date_release" control', () => {
    it('should have the correct messages for all validation rules', () => {
      const dateReleaseErrors = FORM_ERROR_MESSAGES['date_release'];
      expect(dateReleaseErrors).toBeDefined();
      expect(dateReleaseErrors['required']).toBe('La fecha de liberación es obligatoria');
      expect(dateReleaseErrors['invalidReleaseDate']).toBe('Debe ser hoy o posterior');
    });
  });

  describe('for the "date_revision" control', () => {
    it('should have the correct messages for all validation rules', () => {
      const dateRevisionErrors = FORM_ERROR_MESSAGES['date_revision'];
      expect(dateRevisionErrors).toBeDefined();
      expect(dateRevisionErrors['required']).toBe('La fecha de revisión es obligatoria');
      expect(dateRevisionErrors['invalidRevisionDate']).toBe('Debe ser 1 año después de la liberación');
    });
  });
});
