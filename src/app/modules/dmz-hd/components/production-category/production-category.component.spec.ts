import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductionCategoryComponent } from './production-category.component';

describe('ProductionCategoryComponent', () => {
  let component: ProductionCategoryComponent;
  let fixture: ComponentFixture<ProductionCategoryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProductionCategoryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductionCategoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
