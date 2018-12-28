import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NavDetailBasicEditorExComponent } from './nav-detail-basic-editor-ex.component';

describe('NavDetailBasicEditorExComponent', () => {
  let component: NavDetailBasicEditorExComponent;
  let fixture: ComponentFixture<NavDetailBasicEditorExComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NavDetailBasicEditorExComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NavDetailBasicEditorExComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
