import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WorkFlowRuleDetailDefineEditorComponent } from './work-flow-rule-detail-define-editor.component';

describe('WorkFlowRuleDetailDefineEditorComponent', () => {
  let component: WorkFlowRuleDetailDefineEditorComponent;
  let fixture: ComponentFixture<WorkFlowRuleDetailDefineEditorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WorkFlowRuleDetailDefineEditorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WorkFlowRuleDetailDefineEditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
