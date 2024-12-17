import { inject } from '@angular/core';
import type { CanActivateFn } from '@angular/router';
import { Router } from '@angular/router';
import { map, take } from 'rxjs';

import { AuthService } from '@taro/auth/services';
import { getRoute, PATHS } from '@taro/core';

export const logged: CanActivateFn = () => {
  const router = inject(Router);
  const authService = inject(AuthService);

  return authService.logged$.pipe(
    take(1),
    map((isLogged) => {
      if (isLogged) {
        return true;
      }

      return router.createUrlTree(getRoute(PATHS.authLogin));
    }),
  );
};
