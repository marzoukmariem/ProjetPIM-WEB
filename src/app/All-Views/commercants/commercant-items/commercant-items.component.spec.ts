import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CommercantItemsComponent } from './commercant-items.component';

describe('CommercantItemsComponent', () => {
  let component: CommercantItemsComponent;
  let fixture: ComponentFixture<CommercantItemsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CommercantItemsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CommercantItemsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
