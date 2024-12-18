import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink } from '@angular/router';

import { PATHS } from '@taro/core';
import { IconBrandComponent, IconCardComponent } from '@taro/ui/icons';

@Component({
  selector: 'taro-home-page',
  imports: [RouterLink, IconBrandComponent, IconCardComponent],
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomePageComponent {
  readonly paths = PATHS;
}
