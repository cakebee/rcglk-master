import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StuorgdetailComponent } from './stuorgdetail.component';

describe('StuorgdetailComponent', () => {
  let component: StuorgdetailComponent;
  let fixture: ComponentFixture<StuorgdetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StuorgdetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StuorgdetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
