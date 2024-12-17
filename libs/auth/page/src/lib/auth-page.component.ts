import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'taro-auth-page',
  templateUrl: './auth-page.component.html',
  styleUrl: './auth-page.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AuthPageComponent {}
