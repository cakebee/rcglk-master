import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PrizecheckComponent } from './prizecheck.component';

describe('PrizecheckComponent', () => {
  let component: PrizecheckComponent;
  let fixture: ComponentFixture<PrizecheckComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PrizecheckComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PrizecheckComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
