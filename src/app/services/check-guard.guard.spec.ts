import { TestBed } from '@angular/core/testing';

import { CheckGuardGuard } from './check-guard.guard';

describe('CheckGuardGuard', () => {
  let guard: CheckGuardGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(CheckGuardGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
