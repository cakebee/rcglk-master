import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StuviewessayComponent } from './stuviewessay.component';

describe('StuviewessayComponent', () => {
  let component: StuviewessayComponent;
  let fixture: ComponentFixture<StuviewessayComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StuviewessayComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StuviewessayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
