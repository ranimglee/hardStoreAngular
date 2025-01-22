import { TestBed } from '@angular/core/testing';

import { CategoriProduitService } from './categori-produit.service';

describe('CategoriProduitService', () => {
  let service: CategoriProduitService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CategoriProduitService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
