import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailInfoTabComponent } from './detail-info-tab.component';

describe('DetailInfoTabComponent', () => {
  let component: DetailInfoTabComponent;
  let fixture: ComponentFixture<DetailInfoTabComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DetailInfoTabComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailInfoTabComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
