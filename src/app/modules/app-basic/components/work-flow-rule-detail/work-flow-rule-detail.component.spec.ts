import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WorkFlowRuleDetailComponent } from './work-flow-rule-detail.component';

describe('WorkFlowRuleDetailComponent', () => {
  let component: WorkFlowRuleDetailComponent;
  let fixture: ComponentFixture<WorkFlowRuleDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WorkFlowRuleDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WorkFlowRuleDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
