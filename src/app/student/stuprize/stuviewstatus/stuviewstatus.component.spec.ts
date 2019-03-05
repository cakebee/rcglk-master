import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StuviewstatusComponent } from './stuviewstatus.component';

describe('StuviewstatusComponent', () => {
  let component: StuviewstatusComponent;
  let fixture: ComponentFixture<StuviewstatusComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StuviewstatusComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StuviewstatusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
