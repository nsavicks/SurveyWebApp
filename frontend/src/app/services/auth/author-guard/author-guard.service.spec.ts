import { TestBed } from '@angular/core/testing';

import { AuthorGuardService } from './author-guard.service';

describe('AuthorGuardService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AuthorGuardService = TestBed.get(AuthorGuardService);
    expect(service).toBeTruthy();
  });
});
