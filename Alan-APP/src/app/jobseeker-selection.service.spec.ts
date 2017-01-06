/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { JobseekerSelectionService } from './jobseeker-selection.service';

describe('Service: JobseekerSelection', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [JobseekerSelectionService]
    });
  });

  it('should ...', inject([JobseekerSelectionService], (service: JobseekerSelectionService) => {
    expect(service).toBeTruthy();
  }));
});
