export const FORM_ERROR_MESSAGES: Record<string, Record<string, string>> = {
  id: {
    required: 'El ID es obligatorio',
    minlength: 'Mínimo 3 caracteres',
    maxlength: 'Máximo 10 caracteres',
    idExists: 'El ID ya existe'
  },
  name: {
    required: 'El nombre es obligatorio',
    minlength: 'Mínimo 5 caracteres',
    maxlength: 'Máximo 100 caracteres'
  },
  description: {
    required: 'La descripción es obligatoria',
    minlength: 'Mínimo 10 caracteres',
    maxlength: 'Máximo 200 caracteres'
  },
  logo: { required: 'El logo es obligatorio' },
  date_relese: {
    required: 'La fecha de liberación es obligatoria',
    invalidReleaseDate: 'Debe ser hoy o posterior'
  },
  date_revision: {
    required: 'La fecha de revisión es obligatoria',
    invalidRevisionDate: 'Debe ser 1 año después de la liberación'
  },
  search: {
    minlength: 'Mínimo 3 caracteres para buscar el producto',
  }
};