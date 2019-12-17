import { TestBed } from '@angular/core/testing';

import { AdministratorGuardService } from './administrator-guard.service';

describe('AdministratorGuardService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AdministratorGuardService = TestBed.get(AdministratorGuardService);
    expect(service).toBeTruthy();
  });
});
