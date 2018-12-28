import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CommonPaginatorBarComponent } from './common-paginator-bar.component';

describe('CommonPaginatorBarComponent', () => {
  let component: CommonPaginatorBarComponent;
  let fixture: ComponentFixture<CommonPaginatorBarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CommonPaginatorBarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CommonPaginatorBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
