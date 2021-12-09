import { TestBed } from '@angular/core/testing';

import { AppCoordinatesService } from './app-coordinates.service';

describe('AppCoordinatesService', () => {
  let service: AppCoordinatesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AppCoordinatesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
