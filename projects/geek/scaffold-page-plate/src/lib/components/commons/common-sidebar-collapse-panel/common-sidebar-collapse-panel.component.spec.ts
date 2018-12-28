import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CommonSidebarCollapsePanelComponent } from './common-sidebar-collapse-panel.component';

describe('CommonSidebarCollapsePanelComponent', () => {
  let component: CommonSidebarCollapsePanelComponent;
  let fixture: ComponentFixture<CommonSidebarCollapsePanelComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CommonSidebarCollapsePanelComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CommonSidebarCollapsePanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
