import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OrgcheckComponent } from './orgcheck.component';

describe('OrgcheckComponent', () => {
  let component: OrgcheckComponent;
  let fixture: ComponentFixture<OrgcheckComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OrgcheckComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OrgcheckComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
