import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ErreurpageComponent } from './erreurpage.component';

describe('ErreurpageComponent', () => {
  let component: ErreurpageComponent;
  let fixture: ComponentFixture<ErreurpageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ErreurpageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ErreurpageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
