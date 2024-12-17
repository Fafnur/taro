import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'taro-dashboard-page',
  templateUrl: './dashboard-page.component.html',
  styleUrl: './dashboard-page.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DashboardPageComponent {}
