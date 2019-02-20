import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HistoriqueMagazinComponent } from './historique-magazin.component';

describe('HistoriqueMagazinComponent', () => {
  let component: HistoriqueMagazinComponent;
  let fixture: ComponentFixture<HistoriqueMagazinComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HistoriqueMagazinComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HistoriqueMagazinComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
