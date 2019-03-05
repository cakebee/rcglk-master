import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StuaddprizeComponent } from './stuaddprize.component';

describe('StuaddprizeComponent', () => {
  let component: StuaddprizeComponent;
  let fixture: ComponentFixture<StuaddprizeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StuaddprizeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StuaddprizeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
