export type FieldError = {
  field: string;
  message: string;
};

export type FormResult<T> =
  | { ok: true; data: T }
  | { ok: false; errors: readonly FieldError[] };
