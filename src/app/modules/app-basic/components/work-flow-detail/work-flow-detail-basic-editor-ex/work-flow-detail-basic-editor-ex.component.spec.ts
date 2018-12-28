import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WorkFlowDetailBasicEditorExComponent } from './work-flow-detail-basic-editor-ex.component';

describe('WorkFlowDetailBasicEditorExComponent', () => {
  let component: WorkFlowDetailBasicEditorExComponent;
  let fixture: ComponentFixture<WorkFlowDetailBasicEditorExComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WorkFlowDetailBasicEditorExComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WorkFlowDetailBasicEditorExComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
