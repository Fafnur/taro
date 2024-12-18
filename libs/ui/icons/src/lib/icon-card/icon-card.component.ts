import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'taro-icon-card',
  templateUrl: './icon-card.component.html',
  styleUrl: './icon-card.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class IconCardComponent {}
