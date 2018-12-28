import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductGroupDetailCategoryFormComponent } from './product-group-detail-category-form.component';

describe('ProductGroupDetailCategoryFormComponent', () => {
  let component: ProductGroupDetailCategoryFormComponent;
  let fixture: ComponentFixture<ProductGroupDetailCategoryFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProductGroupDetailCategoryFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductGroupDetailCategoryFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
