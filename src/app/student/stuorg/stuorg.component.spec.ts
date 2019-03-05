import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StuorgComponent } from './stuorg.component';

describe('StuorgComponent', () => {
  let component: StuorgComponent;
  let fixture: ComponentFixture<StuorgComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StuorgComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StuorgComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
