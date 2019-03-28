import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AcceuilHomeComponent } from './acceuil-home.component';

describe('AcceuilHomeComponent', () => {
  let component: AcceuilHomeComponent;
  let fixture: ComponentFixture<AcceuilHomeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AcceuilHomeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AcceuilHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
