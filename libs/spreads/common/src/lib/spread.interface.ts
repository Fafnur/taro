export enum SpreadType {
  Single = 'single',
  Custom = 'custom',
}

export interface Spread {
  readonly uuid: string;
  readonly type: 'single' | 'custom';
  readonly cards: number[];
}
