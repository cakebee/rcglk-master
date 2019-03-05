import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StuinfoComponent } from './stuinfo.component';

describe('StuinfoComponent', () => {
  let component: StuinfoComponent;
  let fixture: ComponentFixture<StuinfoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StuinfoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StuinfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
