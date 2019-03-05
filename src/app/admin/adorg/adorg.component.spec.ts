import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdorgComponent } from './adorg.component';

describe('AdorgComponent', () => {
  let component: AdorgComponent;
  let fixture: ComponentFixture<AdorgComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdorgComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdorgComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
