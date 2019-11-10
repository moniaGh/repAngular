import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PensionnaireComponent } from './pensionnaire.component';

describe('PensionnaireComponent', () => {
  let component: PensionnaireComponent;
  let fixture: ComponentFixture<PensionnaireComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PensionnaireComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PensionnaireComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
