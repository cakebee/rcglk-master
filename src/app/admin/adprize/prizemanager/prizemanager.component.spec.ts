import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PrizemanagerComponent } from './prizemanager.component';

describe('PrizemanagerComponent', () => {
  let component: PrizemanagerComponent;
  let fixture: ComponentFixture<PrizemanagerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PrizemanagerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PrizemanagerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
