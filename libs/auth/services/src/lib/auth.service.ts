import { Injectable } from '@angular/core';
import { ReplaySubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly state$ = new ReplaySubject<boolean>(1);

  readonly logged$ = this.state$.asObservable();

  constructor() {
    this.state$.next(false);
  }
}
