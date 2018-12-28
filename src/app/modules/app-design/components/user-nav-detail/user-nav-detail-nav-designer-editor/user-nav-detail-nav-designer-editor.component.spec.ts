import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserNavDetailNavDesignerEditorComponent } from './user-nav-detail-nav-designer-editor.component';

describe('UserNavDetailNavDesignerEditorComponent', () => {
  let component: UserNavDetailNavDesignerEditorComponent;
  let fixture: ComponentFixture<UserNavDetailNavDesignerEditorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserNavDetailNavDesignerEditorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserNavDetailNavDesignerEditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
