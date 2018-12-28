import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CardListContentComponent } from './card-list-content.component';

describe('CardListContentComponent', () => {
  let component: CardListContentComponent;
  let fixture: ComponentFixture<CardListContentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CardListContentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CardListContentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
