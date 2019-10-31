import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductReplaceGroupItemComponent } from './product-replace-group-item.component';

describe('ProductReplaceGroupItemComponent', () => {
  let component: ProductReplaceGroupItemComponent;
  let fixture: ComponentFixture<ProductReplaceGroupItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProductReplaceGroupItemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductReplaceGroupItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
