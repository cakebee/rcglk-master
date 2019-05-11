import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StuprojectComponent } from './stuproject.component';

describe('StuprojectComponent', () => {
  let component: StuprojectComponent;
  let fixture: ComponentFixture<StuprojectComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StuprojectComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StuprojectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
