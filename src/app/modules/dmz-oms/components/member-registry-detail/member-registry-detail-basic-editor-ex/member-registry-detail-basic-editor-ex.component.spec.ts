import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MemberRegistryDetailBasicEditorExComponent } from './member-registry-detail-basic-editor-ex.component';

describe('MemberRegistryDetailBasicEditorExComponent', () => {
  let component: MemberRegistryDetailBasicEditorExComponent;
  let fixture: ComponentFixture<MemberRegistryDetailBasicEditorExComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MemberRegistryDetailBasicEditorExComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MemberRegistryDetailBasicEditorExComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
