import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserNavDetailComponent } from './user-nav-detail.component';

describe('UserNavDetailComponent', () => {
  let component: UserNavDetailComponent;
  let fixture: ComponentFixture<UserNavDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserNavDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserNavDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
