import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductGroupDetailBasicEditorExComponent } from './product-group-detail-basic-editor-ex.component';

describe('ProductGroupDetailBasicEditorExComponent', () => {
  let component: ProductGroupDetailBasicEditorExComponent;
  let fixture: ComponentFixture<ProductGroupDetailBasicEditorExComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProductGroupDetailBasicEditorExComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductGroupDetailBasicEditorExComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
