import { TestBed } from '@angular/core/testing';
import { ResolveFn } from '@angular/router';

import { filtersResolver } from './filters.resolver';

describe('filtersResolver', () => {
  const executeResolver: ResolveFn<boolean> = (...resolverParameters) => 
      TestBed.runInInjectionContext(() => filtersResolver(...resolverParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeResolver).toBeTruthy();
  });
});
