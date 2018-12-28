import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductGroupCategoryComponent } from './product-group-category.component';

describe('ProductGroupCategoryComponent', () => {
  let component: ProductGroupCategoryComponent;
  let fixture: ComponentFixture<ProductGroupCategoryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProductGroupCategoryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductGroupCategoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
