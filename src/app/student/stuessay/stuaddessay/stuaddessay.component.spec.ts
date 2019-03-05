import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StuaddessayComponent } from './stuaddessay.component';

describe('StuaddessayComponent', () => {
  let component: StuaddessayComponent;
  let fixture: ComponentFixture<StuaddessayComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StuaddessayComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StuaddessayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
