import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChangeIconDialogPlateComponent } from './change-icon-dialog-plate.component';

describe('ChangeIconDialogPlateComponent', () => {
  let component: ChangeIconDialogPlateComponent;
  let fixture: ComponentFixture<ChangeIconDialogPlateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChangeIconDialogPlateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChangeIconDialogPlateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
