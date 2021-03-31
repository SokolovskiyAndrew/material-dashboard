import { TestBed } from '@angular/core/testing';

import { ShareModalsProviderService } from './share-modals-provider.service';

describe('ShareModalsProviderService', () => {
  let service: ShareModalsProviderService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ShareModalsProviderService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
