import { Injectable } from '@angular/core';
import { ReplaySubject } from 'rxjs';

import type { User } from '@taro/users/common';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  readonly user$ = new ReplaySubject<User>(1);
}
