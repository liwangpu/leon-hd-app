import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WorkFlowRuleDetailBasicEditorExComponent } from './work-flow-rule-detail-basic-editor-ex.component';

describe('WorkFlowRuleDetailBasicEditorExComponent', () => {
  let component: WorkFlowRuleDetailBasicEditorExComponent;
  let fixture: ComponentFixture<WorkFlowRuleDetailBasicEditorExComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WorkFlowRuleDetailBasicEditorExComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WorkFlowRuleDetailBasicEditorExComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
