import type { Route } from '@angular/router';

export const PATHS = {
  home: '/',
  dashboard: '/dashboard',

  notFound: '/not-found',
  serverError: '/server-error',
  permissionDenied: '/permission-denied',
} as const;

export type PathValues = (typeof PATHS)[keyof typeof PATHS];

type Filter<T extends string> = T extends `:${infer Param}` ? Param : never;
type Split<Value extends string> = Value extends `${infer LValue}/${infer RValue}` ? Filter<LValue> | Split<RValue> : Filter<Value>;

export type GetPathParams<T extends string> = {
  [key in Split<T>]: string | number;
};

export interface NavigationLink<T extends PathValues = PathValues> {
  readonly label: string;
  readonly route: T;
  readonly params?: GetPathParams<T>;
  readonly suffix?: string;
}

export interface NavigationChild {
  readonly path: PathValues;
  readonly redirectTo?: string;
}

export function getRoute<T extends PathValues>(path: T, params: Record<string, string | number> = {}): (string | number)[] {
  const segments = path.split('/').filter((value) => value.length);
  const routeWithParams: (string | number)[] = ['/'];

  for (const segment of segments) {
    if (segment.charAt(0) === ':') {
      const paramName = segment.slice(1);
      const prop = params[paramName];
      if (prop) {
        routeWithParams.push(params[paramName]);
      } else {
        routeWithParams.push(paramName);
      }
    } else {
      routeWithParams.push(segment);
    }
  }

  return routeWithParams;
}

export function getChildPath(path: PathValues, parent: PathValues): string {
  return path.substring(parent.length + 1);
}

export function childNavigation(route: NavigationChild, parent: PathValues): Route {
  if (!route.path.length || route.path.length < parent.length + 1) {
    return route;
  }

  return {
    ...route,
    path: getChildPath(route.path, parent),
  };
}

export function withChildNavigation(parent: PathValues): (route: NavigationChild) => Route {
  return (route: NavigationChild) => childNavigation(route, parent);
}
