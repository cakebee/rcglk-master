import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EssaymanagerComponent } from './essaymanager.component';

describe('EssaymanagerComponent', () => {
  let component: EssaymanagerComponent;
  let fixture: ComponentFixture<EssaymanagerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EssaymanagerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EssaymanagerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
