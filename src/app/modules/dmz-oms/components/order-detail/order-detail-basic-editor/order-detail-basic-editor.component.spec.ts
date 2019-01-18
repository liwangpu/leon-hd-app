import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OrderDetailBasicEditorComponent } from './order-detail-basic-editor.component';

describe('OrderDetailBasicEditorComponent', () => {
  let component: OrderDetailBasicEditorComponent;
  let fixture: ComponentFixture<OrderDetailBasicEditorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OrderDetailBasicEditorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OrderDetailBasicEditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
