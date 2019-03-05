import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StuviewprizeComponent } from './stuviewprize.component';

describe('StuviewprizeComponent', () => {
  let component: StuviewprizeComponent;
  let fixture: ComponentFixture<StuviewprizeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StuviewprizeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StuviewprizeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
