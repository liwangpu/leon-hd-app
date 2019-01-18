import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OrderDetailCustomerEditorComponent } from './order-detail-customer-editor.component';

describe('OrderDetailCustomerEditorComponent', () => {
  let component: OrderDetailCustomerEditorComponent;
  let fixture: ComponentFixture<OrderDetailCustomerEditorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OrderDetailCustomerEditorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OrderDetailCustomerEditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
