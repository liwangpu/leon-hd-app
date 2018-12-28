import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MemberDetailBasicEditorExComponent } from './member-detail-basic-editor-ex.component';

describe('MemberDetailBasicEditorExComponent', () => {
  let component: MemberDetailBasicEditorExComponent;
  let fixture: ComponentFixture<MemberDetailBasicEditorExComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MemberDetailBasicEditorExComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MemberDetailBasicEditorExComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
