import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OrganizationDetailOwnerEditorComponent } from './organization-detail-owner-editor.component';

describe('OrganizationDetailOwnerEditorComponent', () => {
  let component: OrganizationDetailOwnerEditorComponent;
  let fixture: ComponentFixture<OrganizationDetailOwnerEditorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OrganizationDetailOwnerEditorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OrganizationDetailOwnerEditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
