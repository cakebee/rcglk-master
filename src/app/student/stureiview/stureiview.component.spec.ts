import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StureiviewComponent } from './stureiview.component';

describe('StureiviewComponent', () => {
  let component: StureiviewComponent;
  let fixture: ComponentFixture<StureiviewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StureiviewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StureiviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
