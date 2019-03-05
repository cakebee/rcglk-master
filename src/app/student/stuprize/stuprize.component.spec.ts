import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StuprizeComponent } from './stuprize.component';

describe('StuprizeComponent', () => {
  let component: StuprizeComponent;
  let fixture: ComponentFixture<StuprizeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StuprizeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StuprizeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
