import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdessayComponent } from './adessay.component';

describe('AdessayComponent', () => {
  let component: AdessayComponent;
  let fixture: ComponentFixture<AdessayComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdessayComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdessayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
