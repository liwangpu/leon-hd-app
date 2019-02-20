import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductPackageManageComponent } from './product-package-manage.component';

describe('ProductPackageManageComponent', () => {
  let component: ProductPackageManageComponent;
  let fixture: ComponentFixture<ProductPackageManageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProductPackageManageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductPackageManageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
