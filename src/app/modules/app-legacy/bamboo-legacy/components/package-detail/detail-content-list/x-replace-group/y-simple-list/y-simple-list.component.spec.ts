import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { YSimpleListComponent } from './y-simple-list.component';

describe('YSimpleListComponent', () => {
  let component: YSimpleListComponent;
  let fixture: ComponentFixture<YSimpleListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ YSimpleListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(YSimpleListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
