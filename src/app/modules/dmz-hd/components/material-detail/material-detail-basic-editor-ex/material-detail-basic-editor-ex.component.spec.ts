import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MaterialDetailBasicEditorExComponent } from './material-detail-basic-editor-ex.component';

describe('MaterialDetailBasicEditorExComponent', () => {
  let component: MaterialDetailBasicEditorExComponent;
  let fixture: ComponentFixture<MaterialDetailBasicEditorExComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MaterialDetailBasicEditorExComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MaterialDetailBasicEditorExComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
