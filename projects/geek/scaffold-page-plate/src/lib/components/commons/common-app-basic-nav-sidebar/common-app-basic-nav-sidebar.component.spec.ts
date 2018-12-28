import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CommonAppBasicNavSidebarComponent } from './common-app-basic-nav-sidebar.component';

describe('CommonAppBasicNavSidebarComponent', () => {
  let component: CommonAppBasicNavSidebarComponent;
  let fixture: ComponentFixture<CommonAppBasicNavSidebarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CommonAppBasicNavSidebarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CommonAppBasicNavSidebarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
