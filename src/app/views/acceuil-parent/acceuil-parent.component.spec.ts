import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AcceuilParentComponent } from './acceuil-parent.component';

describe('AcceuilParentComponent', () => {
  let component: AcceuilParentComponent;
  let fixture: ComponentFixture<AcceuilParentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AcceuilParentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AcceuilParentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
