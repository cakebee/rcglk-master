import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdqualityComponent } from './adquality.component';

describe('AdqualityComponent', () => {
  let component: AdqualityComponent;
  let fixture: ComponentFixture<AdqualityComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdqualityComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdqualityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
