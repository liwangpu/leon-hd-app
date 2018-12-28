import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CommonLitimgListComponent } from './common-litimg-list.component';

describe('CommonLitimgListComponent', () => {
  let component: CommonLitimgListComponent;
  let fixture: ComponentFixture<CommonLitimgListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CommonLitimgListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CommonLitimgListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
