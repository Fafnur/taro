/*  eslint-disable @typescript-eslint/no-explicit-any */

/**
 * Partial Record type
 */
export type PartialRecord<K extends keyof never, T> = {
  readonly [P in K]?: T;
};

export type Nullable<T> = {
  [P in keyof T]: T[P] | null;
};

export type ChangeFn = (value: any) => void;

export type TouchedFn = () => void;

export type DisplayFn = (value: any, index?: number) => string;

export type MaskFn = (value: any) => string;

export type StyleFn = (value?: any) => string | string[];

export type CoerceBoolean = boolean | string | undefined | null;

export type CoerceNumber = number | string | undefined | null;

export type CallbackFn = (...args: unknown[]) => void;

export type NonEmptyArray<T> = [T, ...T[]];
