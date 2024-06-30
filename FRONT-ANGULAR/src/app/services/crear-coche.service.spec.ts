import { TestBed } from '@angular/core/testing';

import { CrearCocheService } from './crear-coche.service';

describe('CrearCocheService', () => {
  let service: CrearCocheService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CrearCocheService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
