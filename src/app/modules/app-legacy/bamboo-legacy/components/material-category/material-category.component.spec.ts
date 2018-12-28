import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MaterialCategoryComponent } from './material-category.component';

describe('MaterialCategoryComponent', () => {
  let component: MaterialCategoryComponent;
  let fixture: ComponentFixture<MaterialCategoryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MaterialCategoryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MaterialCategoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
