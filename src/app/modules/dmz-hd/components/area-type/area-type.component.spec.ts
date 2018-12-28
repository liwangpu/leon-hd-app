import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AreaTypeComponent } from './area-type.component';

describe('AreaTypeComponent', () => {
  let component: AreaTypeComponent;
  let fixture: ComponentFixture<AreaTypeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AreaTypeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AreaTypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
