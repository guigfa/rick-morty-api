import { ResolveFn } from '@angular/router';

export const filtersResolver: ResolveFn<boolean> = (route, state) => {
  return true;
};
