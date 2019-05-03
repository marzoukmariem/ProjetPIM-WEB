import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TestreponsiveComponent } from './testreponsive.component';

describe('TestreponsiveComponent', () => {
  let component: TestreponsiveComponent;
  let fixture: ComponentFixture<TestreponsiveComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TestreponsiveComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TestreponsiveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
