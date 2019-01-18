import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OrderDetailListEditorComponent } from './order-detail-list-editor.component';

describe('OrderDetailListEditorComponent', () => {
  let component: OrderDetailListEditorComponent;
  let fixture: ComponentFixture<OrderDetailListEditorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OrderDetailListEditorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OrderDetailListEditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
