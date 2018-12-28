import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserNavDetailNavDesignFormComponent } from './user-nav-detail-nav-design-form.component';

describe('UserNavDetailNavDesignFormComponent', () => {
  let component: UserNavDetailNavDesignFormComponent;
  let fixture: ComponentFixture<UserNavDetailNavDesignFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserNavDetailNavDesignFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserNavDetailNavDesignFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
