import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WorkFlowRuleDetailBasicEditorComponent } from './work-flow-rule-detail-basic-editor.component';

describe('WorkFlowRuleDetailBasicEditorComponent', () => {
  let component: WorkFlowRuleDetailBasicEditorComponent;
  let fixture: ComponentFixture<WorkFlowRuleDetailBasicEditorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WorkFlowRuleDetailBasicEditorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WorkFlowRuleDetailBasicEditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
