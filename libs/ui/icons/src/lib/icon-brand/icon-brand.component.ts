import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'taro-icon-brand',
  templateUrl: './icon-brand.component.html',
  styleUrl: './icon-brand.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    class: 'taro-icon-brand',
  },
})
export class IconBrandComponent {}
