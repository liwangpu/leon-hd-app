import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailEditorComponent } from './detail-editor.component';

describe('DetailEditorComponent', () => {
  let component: DetailEditorComponent;
  let fixture: ComponentFixture<DetailEditorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DetailEditorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailEditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
