import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdprojectComponent } from './adproject.component';

describe('AdprojectComponent', () => {
  let component: AdprojectComponent;
  let fixture: ComponentFixture<AdprojectComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdprojectComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdprojectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
