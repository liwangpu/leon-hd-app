import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OrderDetailListItemFormComponent } from './order-detail-list-item-form.component';

describe('OrderDetailListItemFormComponent', () => {
  let component: OrderDetailListItemFormComponent;
  let fixture: ComponentFixture<OrderDetailListItemFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OrderDetailListItemFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OrderDetailListItemFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
