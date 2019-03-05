import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StuprizedetailComponent } from './stuprizedetail.component';

describe('StuprizedetailComponent', () => {
  let component: StuprizedetailComponent;
  let fixture: ComponentFixture<StuprizedetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StuprizedetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StuprizedetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
