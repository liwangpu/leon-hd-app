import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WorkFlowDetailFlowFormComponent } from './work-flow-detail-flow-form.component';

describe('WorkFlowDetailFlowFormComponent', () => {
  let component: WorkFlowDetailFlowFormComponent;
  let fixture: ComponentFixture<WorkFlowDetailFlowFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WorkFlowDetailFlowFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WorkFlowDetailFlowFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
