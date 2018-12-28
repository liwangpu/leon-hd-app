import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OrganizationTypeDetailComponent } from './organization-type-detail.component';

describe('OrganizationTypeDetailComponent', () => {
  let component: OrganizationTypeDetailComponent;
  let fixture: ComponentFixture<OrganizationTypeDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OrganizationTypeDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OrganizationTypeDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
