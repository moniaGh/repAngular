import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListPenComponent } from './list-pen.component';

describe('ListPenComponent', () => {
  let component: ListPenComponent;
  let fixture: ComponentFixture<ListPenComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListPenComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListPenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
