import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CommercantsComponent } from './commercants.component';

describe('CommercantsComponent', () => {
  let component: CommercantsComponent;
  let fixture: ComponentFixture<CommercantsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CommercantsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CommercantsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
