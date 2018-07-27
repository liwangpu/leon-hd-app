import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BasicInfoTabComponent } from './basic-info-tab.component';

describe('BasicInfoTabComponent', () => {
  let component: BasicInfoTabComponent;
  let fixture: ComponentFixture<BasicInfoTabComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BasicInfoTabComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BasicInfoTabComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
