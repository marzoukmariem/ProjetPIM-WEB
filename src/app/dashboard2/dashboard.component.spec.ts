import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardComponent2 } from './dashboard.component';

describe('DashboardComponent', () => {
  let component: DashboardComponent2;
  let fixture: ComponentFixture<DashboardComponent2>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DashboardComponent2 ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DashboardComponent2);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
