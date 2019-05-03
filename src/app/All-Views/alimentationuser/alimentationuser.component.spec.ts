import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AlimentationuserComponent } from './alimentationuser.component';

describe('AlimentationuserComponent', () => {
  let component: AlimentationuserComponent;
  let fixture: ComponentFixture<AlimentationuserComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AlimentationuserComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AlimentationuserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
