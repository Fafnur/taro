import type { FormControl, FormGroup } from '@angular/forms';

export type FormFor<T> = {
  [P in keyof T]: T[P] extends Record<string, unknown>
    ? T[P] extends any[]
      ? FormControl<T[P]>
      : FormGroup<FormFor<T[P]>>
    : FormControl<T[P]>;
};

export interface FormChoice<V extends string | number = string | number> {
  readonly label: string;
  readonly value: V;
}

export type FormGroupFor<T extends object> = FormGroup<FormFor<T>>;
