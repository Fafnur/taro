import { inject } from '@angular/core';
import type { CanActivateFn } from '@angular/router';
import { Router } from '@angular/router';
import { map, take } from 'rxjs';

import { getRoute, PATHS } from '@taro/core';
import { UserStatus } from '@taro/users/common';
import { UserService } from '@taro/users/services';

export const canUser: CanActivateFn = () => {
  const router = inject(Router);
  const userService = inject(UserService);

  return userService.user$.pipe(
    take(1),
    map((user) => {
      if (user.status !== UserStatus.Banned) {
        return true;
      }

      return router.createUrlTree(getRoute(PATHS.authLogin));
    }),
  );
};
