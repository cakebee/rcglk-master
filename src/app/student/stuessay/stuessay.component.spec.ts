import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StuessayComponent } from './stuessay.component';

describe('StuessayComponent', () => {
  let component: StuessayComponent;
  let fixture: ComponentFixture<StuessayComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StuessayComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StuessayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
