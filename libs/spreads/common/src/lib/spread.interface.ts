export enum SpreadType {
  Single = 'single',
  Custom = 'custom',
}

export interface Spread {
  readonly uuid: string;
  readonly type: SpreadType;
  readonly cards: number[];
  readonly additional: number[];
  readonly user: string;
  readonly created: string;
  readonly updated: string;
}

export type SpreadCreate = Omit<Spread, 'created' | 'updated' | 'user' | 'cards' | 'additional'>;

export type SpreadChange = Omit<Spread, 'type' | 'created' | 'updated' | 'user'>;
