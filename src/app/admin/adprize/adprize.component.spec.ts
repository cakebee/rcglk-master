import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdprizeComponent } from './adprize.component';

describe('AdprizeComponent', () => {
  let component: AdprizeComponent;
  let fixture: ComponentFixture<AdprizeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdprizeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdprizeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
