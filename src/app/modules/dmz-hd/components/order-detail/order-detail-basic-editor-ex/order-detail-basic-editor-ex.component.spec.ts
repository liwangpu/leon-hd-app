import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OrderDetailBasicEditorExComponent } from './order-detail-basic-editor-ex.component';

describe('OrderDetailBasicEditorExComponent', () => {
  let component: OrderDetailBasicEditorExComponent;
  let fixture: ComponentFixture<OrderDetailBasicEditorExComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OrderDetailBasicEditorExComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OrderDetailBasicEditorExComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
