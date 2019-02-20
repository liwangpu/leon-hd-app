import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductPackageItemComponent } from './product-package-item.component';

describe('ProductPackageItemComponent', () => {
  let component: ProductPackageItemComponent;
  let fixture: ComponentFixture<ProductPackageItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProductPackageItemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductPackageItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
