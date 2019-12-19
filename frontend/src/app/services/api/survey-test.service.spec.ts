import { TestBed } from '@angular/core/testing';

import { SurveyTestService } from './survey-test.service';

describe('SurveyTestService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SurveyTestService = TestBed.get(SurveyTestService);
    expect(service).toBeTruthy();
  });
});
