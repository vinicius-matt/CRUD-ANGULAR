import { TestBed } from '@angular/core/testing';
import { ResolveFn } from '@angular/router';

import { clientsResolver } from './clients.resolver';
import { Observable } from 'rxjs';
import { Clients } from '../model/clients';

describe('clientsResolver', () => {
  const executeResolver: ResolveFn<Observable<Clients>> = (...resolverParameters) =>
      TestBed.runInInjectionContext(() => clientsResolver(...resolverParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeResolver).toBeTruthy();
  });
});
