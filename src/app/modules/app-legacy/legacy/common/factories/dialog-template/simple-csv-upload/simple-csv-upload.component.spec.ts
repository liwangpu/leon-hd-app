import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SimpleCsvUploadComponent } from './simple-csv-upload.component';

describe('SimpleCsvUploadComponent', () => {
  let component: SimpleCsvUploadComponent;
  let fixture: ComponentFixture<SimpleCsvUploadComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SimpleCsvUploadComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SimpleCsvUploadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
