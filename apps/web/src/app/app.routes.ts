import type { Route } from '@angular/router';

import { logged } from '@taro/auth/guards';
import { PATHS, withChildNavigation } from '@taro/core';

export const appRoutes: Route[] = [
  {
    path: '',
    loadComponent: () => import('@taro/ui/layout'),
    children: [
      {
        path: PATHS.home,
        loadComponent: () => import('@taro/web/home/page'),
      },
      {
        path: PATHS.dashboard,
        canActivate: [logged],
        loadComponent: () => import('@taro/dashboard/page'),
      },
      {
        path: PATHS.auth,
        loadChildren: () => import('./routes/auth.routes'),
      },
    ].map(withChildNavigation(PATHS.currentRoot)),
  },
];
