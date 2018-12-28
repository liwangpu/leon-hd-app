import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserNavDetailBasicEditorExComponent } from './user-nav-detail-basic-editor-ex.component';

describe('UserNavDetailBasicEditorExComponent', () => {
  let component: UserNavDetailBasicEditorExComponent;
  let fixture: ComponentFixture<UserNavDetailBasicEditorExComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserNavDetailBasicEditorExComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserNavDetailBasicEditorExComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
