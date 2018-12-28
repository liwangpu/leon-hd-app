import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductDetailBasicEditorExComponent } from './product-detail-basic-editor-ex.component';

describe('ProductDetailBasicEditorExComponent', () => {
  let component: ProductDetailBasicEditorExComponent;
  let fixture: ComponentFixture<ProductDetailBasicEditorExComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProductDetailBasicEditorExComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductDetailBasicEditorExComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
