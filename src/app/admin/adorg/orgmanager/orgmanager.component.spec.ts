import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OrgmanagerComponent } from './orgmanager.component';

describe('OrgmanagerComponent', () => {
  let component: OrgmanagerComponent;
  let fixture: ComponentFixture<OrgmanagerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OrgmanagerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OrgmanagerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
