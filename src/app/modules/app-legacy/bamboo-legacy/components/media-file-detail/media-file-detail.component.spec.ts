import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MediaFileDetailComponent } from './media-file-detail.component';

describe('MediaFileDetailComponent', () => {
  let component: MediaFileDetailComponent;
  let fixture: ComponentFixture<MediaFileDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MediaFileDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MediaFileDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
