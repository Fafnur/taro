import type { Route } from '@angular/router';

export const appRoutes: Route[] = [
  {
    path: '',
    loadComponent: () => import('@taro/ui/layout'),
    children: [
      {
        path: '',
        loadComponent: () => import('@taro/web/home/page'),
      },
    ],
  },
];
