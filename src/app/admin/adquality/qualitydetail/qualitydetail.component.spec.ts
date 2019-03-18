import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QualitydetailComponent } from './qualitydetail.component';

describe('QualitydetailComponent', () => {
  let component: QualitydetailComponent;
  let fixture: ComponentFixture<QualitydetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QualitydetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QualitydetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
