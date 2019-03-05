import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StuvieworgComponent } from './stuvieworg.component';

describe('StuvieworgComponent', () => {
  let component: StuvieworgComponent;
  let fixture: ComponentFixture<StuvieworgComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StuvieworgComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StuvieworgComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
