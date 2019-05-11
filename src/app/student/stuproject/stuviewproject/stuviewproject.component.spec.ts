import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StuviewprojectComponent } from './stuviewproject.component';

describe('StuviewprojectComponent', () => {
  let component: StuviewprojectComponent;
  let fixture: ComponentFixture<StuviewprojectComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StuviewprojectComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StuviewprojectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
