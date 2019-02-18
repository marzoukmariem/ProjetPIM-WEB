import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AccueilCommercantComponent } from './accueil-commercant.component';

describe('AccueilCommercantComponent', () => {
  let component: AccueilCommercantComponent;
  let fixture: ComponentFixture<AccueilCommercantComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AccueilCommercantComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AccueilCommercantComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
