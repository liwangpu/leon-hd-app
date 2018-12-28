import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CommonListViewerComponent } from './common-list-viewer.component';

describe('CommonListViewerComponent', () => {
  let component: CommonListViewerComponent;
  let fixture: ComponentFixture<CommonListViewerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CommonListViewerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CommonListViewerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
