import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListPComponent } from './list-p.component';

describe('ListPComponent', () => {
  let component: ListPComponent;
  let fixture: ComponentFixture<ListPComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListPComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListPComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
