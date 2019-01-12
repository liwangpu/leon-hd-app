import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SimpleConfirmDialogPlateComponent } from './simple-confirm-dialog-plate.component';

describe('SimpleConfirmDialogPlateComponent', () => {
  let component: SimpleConfirmDialogPlateComponent;
  let fixture: ComponentFixture<SimpleConfirmDialogPlateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SimpleConfirmDialogPlateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SimpleConfirmDialogPlateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
