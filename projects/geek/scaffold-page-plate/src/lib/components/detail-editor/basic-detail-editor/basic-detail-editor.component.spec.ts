import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BasicDetailEditorComponent } from './basic-detail-editor.component';

describe('BasicDetailEditorComponent', () => {
  let component: BasicDetailEditorComponent;
  let fixture: ComponentFixture<BasicDetailEditorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BasicDetailEditorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BasicDetailEditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
