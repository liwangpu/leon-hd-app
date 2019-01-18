import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OrderDetailFlowRejectFormComponent } from './order-detail-flow-reject-form.component';

describe('OrderDetailFlowRejectFormComponent', () => {
  let component: OrderDetailFlowRejectFormComponent;
  let fixture: ComponentFixture<OrderDetailFlowRejectFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OrderDetailFlowRejectFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OrderDetailFlowRejectFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
