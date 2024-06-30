import { TestBed } from '@angular/core/testing';

import { ListcochesService } from './list-coches.service';

describe('ListCochesService', () => {
  let service: ListcochesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ListcochesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
