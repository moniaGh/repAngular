import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FondsComponent } from './fonds.component';

describe('FondsComponent', () => {
  let component: FondsComponent;
  let fixture: ComponentFixture<FondsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FondsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FondsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
