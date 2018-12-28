import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WorkFlowDetailFlowDesignerComponent } from './work-flow-detail-flow-designer.component';

describe('WorkFlowDetailFlowDesignerComponent', () => {
  let component: WorkFlowDetailFlowDesignerComponent;
  let fixture: ComponentFixture<WorkFlowDetailFlowDesignerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WorkFlowDetailFlowDesignerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WorkFlowDetailFlowDesignerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
