import type { PipeTransform } from '@angular/core';
import { Pipe } from '@angular/core';

import type { GetPathParams, PathValues } from './navigation';
import { getRoute } from './navigation';

@Pipe({
  name: 'path',
})
export class PathPipe implements PipeTransform {
  transform<T extends PathValues>(path: T, params?: GetPathParams<T>): string {
    const [root, ...other] = getRoute(path, params);

    return `${root}${other.join('/')}`;
  }
}
