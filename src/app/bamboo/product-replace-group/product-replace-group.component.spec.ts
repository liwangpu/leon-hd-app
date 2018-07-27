import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductReplaceGroupComponent } from './product-replace-group.component';

describe('ProductReplaceGroupComponent', () => {
  let component: ProductReplaceGroupComponent;
  let fixture: ComponentFixture<ProductReplaceGroupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProductReplaceGroupComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductReplaceGroupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
