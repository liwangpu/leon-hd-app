import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WorkFlowRuleComponent } from './work-flow-rule.component';

describe('WorkFlowRuleComponent', () => {
  let component: WorkFlowRuleComponent;
  let fixture: ComponentFixture<WorkFlowRuleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WorkFlowRuleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WorkFlowRuleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
