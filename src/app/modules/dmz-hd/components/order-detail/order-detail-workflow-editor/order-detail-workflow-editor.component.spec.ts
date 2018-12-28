import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OrderDetailWorkflowEditorComponent } from './order-detail-workflow-editor.component';

describe('OrderDetailWorkflowEditorComponent', () => {
  let component: OrderDetailWorkflowEditorComponent;
  let fixture: ComponentFixture<OrderDetailWorkflowEditorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OrderDetailWorkflowEditorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OrderDetailWorkflowEditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
