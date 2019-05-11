import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StuaddprojectComponent } from './stuaddproject.component';

describe('StuaddprojectComponent', () => {
  let component: StuaddprojectComponent;
  let fixture: ComponentFixture<StuaddprojectComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StuaddprojectComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StuaddprojectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
