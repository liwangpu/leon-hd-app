import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SimpleIconListPageComponent } from './simple-icon-list-page.component';

describe('SimpleIconListPageComponent', () => {
  let component: SimpleIconListPageComponent;
  let fixture: ComponentFixture<SimpleIconListPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SimpleIconListPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SimpleIconListPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
