import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MemberDetailHierarchyEditorComponent } from './member-detail-hierarchy-editor.component';

describe('MemberDetailHierarchyEditorComponent', () => {
  let component: MemberDetailHierarchyEditorComponent;
  let fixture: ComponentFixture<MemberDetailHierarchyEditorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MemberDetailHierarchyEditorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MemberDetailHierarchyEditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
