import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AreaTypeDetailComponent } from './area-type-detail.component';

describe('AreaTypeDetailComponent', () => {
  let component: AreaTypeDetailComponent;
  let fixture: ComponentFixture<AreaTypeDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AreaTypeDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AreaTypeDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
