import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ParenteditComponent } from './parentedit.component';

describe('ParenteditComponent', () => {
  let component: ParenteditComponent;
  let fixture: ComponentFixture<ParenteditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ParenteditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ParenteditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
