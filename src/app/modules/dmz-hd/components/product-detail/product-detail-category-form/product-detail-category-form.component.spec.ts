import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductDetailCategoryFormComponent } from './product-detail-category-form.component';

describe('ProductDetailCategoryFormComponent', () => {
  let component: ProductDetailCategoryFormComponent;
  let fixture: ComponentFixture<ProductDetailCategoryFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProductDetailCategoryFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductDetailCategoryFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
