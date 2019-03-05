import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StuaddorgComponent } from './stuaddorg.component';

describe('StuaddorgComponent', () => {
  let component: StuaddorgComponent;
  let fixture: ComponentFixture<StuaddorgComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StuaddorgComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StuaddorgComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
