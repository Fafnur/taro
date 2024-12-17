import type { Route } from '@angular/router';

import { PATHS, withChildNavigation } from '@taro/core';

export const authRoutes: Route[] = [
  {
    path: PATHS.currentRoot,
    redirectTo: PATHS.authLogin,
    pathMatch: 'full',
  },
  {
    path: PATHS.authLogin,
    loadComponent: () => import('@taro/auth/page'),
  },
].map(withChildNavigation(PATHS.auth));

export default authRoutes;
