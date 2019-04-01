import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminLayoutComponent2 } from './admin-layout.component2';

describe('AdminLayoutComponent', () => {
  let component: AdminLayoutComponent2;
  let fixture: ComponentFixture<AdminLayoutComponent2>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminLayoutComponent2 ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminLayoutComponent2);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
