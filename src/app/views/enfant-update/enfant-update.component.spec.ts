import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EnfantUpdateComponent } from './enfant-update.component';

describe('EnfantUpdateComponent', () => {
  let component: EnfantUpdateComponent;
  let fixture: ComponentFixture<EnfantUpdateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EnfantUpdateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EnfantUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
