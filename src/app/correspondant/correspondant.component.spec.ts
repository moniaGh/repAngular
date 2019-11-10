import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CorrespondantComponent } from './correspondant.component';

describe('CorrespondantComponent', () => {
  let component: CorrespondantComponent;
  let fixture: ComponentFixture<CorrespondantComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CorrespondantComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CorrespondantComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
