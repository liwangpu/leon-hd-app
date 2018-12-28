import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfileBasicEditorExComponent } from './profile-basic-editor-ex.component';

describe('ProfileBasicEditorExComponent', () => {
  let component: ProfileBasicEditorExComponent;
  let fixture: ComponentFixture<ProfileBasicEditorExComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProfileBasicEditorExComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfileBasicEditorExComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
