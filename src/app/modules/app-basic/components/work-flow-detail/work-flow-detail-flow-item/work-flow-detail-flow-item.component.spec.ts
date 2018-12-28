import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WorkFlowDetailFlowItemComponent } from './work-flow-detail-flow-item.component';

describe('WorkFlowDetailFlowItemComponent', () => {
  let component: WorkFlowDetailFlowItemComponent;
  let fixture: ComponentFixture<WorkFlowDetailFlowItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WorkFlowDetailFlowItemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WorkFlowDetailFlowItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
