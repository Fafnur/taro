/**
 * Entity
 */
export interface Entity<T extends string | number = string | number> {
  readonly id: T;
}
