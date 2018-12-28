import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductDetailSpecEditorComponent } from './product-detail-spec-editor.component';

describe('ProductDetailSpecEditorComponent', () => {
  let component: ProductDetailSpecEditorComponent;
  let fixture: ComponentFixture<ProductDetailSpecEditorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProductDetailSpecEditorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductDetailSpecEditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
