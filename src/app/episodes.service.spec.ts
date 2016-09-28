/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { EpsiodesService } from './episodes.service';

describe('Service: Epsiodes', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [EpsiodesService]
    });
  });

  it('should ...', inject([EpsiodesService], (service: EpsiodesService) => {
    expect(service).toBeTruthy();
  }));
});
