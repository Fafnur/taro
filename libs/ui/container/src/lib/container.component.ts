import { coerceBooleanProperty } from '@angular/cdk/coercion';
import { ChangeDetectionStrategy, Component, input } from '@angular/core';

import type { CoerceBoolean } from '@taro/core';

@Component({
  selector: 'taro-container',
  template: '<ng-content/>',
  styleUrl: './container.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    class: 'taro-container',
    '[class.is-fluid]': 'fluid()',
    '[class.is-no-gutter]': 'noGutter()',
  },
})
export class ContainerComponent {
  readonly fluid = input<CoerceBoolean, CoerceBoolean>(undefined, { transform: coerceBooleanProperty });
  readonly noGutter = input<CoerceBoolean, CoerceBoolean>(undefined, { transform: coerceBooleanProperty });
}
