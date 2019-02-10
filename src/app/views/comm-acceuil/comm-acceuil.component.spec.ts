import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CommAcceuilComponent } from './comm-acceuil.component';

describe('CommAcceuilComponent', () => {
  let component: CommAcceuilComponent;
  let fixture: ComponentFixture<CommAcceuilComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CommAcceuilComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CommAcceuilComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
