import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PreguntaMultipleComponent } from './pregunta-multiple.component';

describe('PreguntaMultipleComponent', () => {
  let component: PreguntaMultipleComponent;
  let fixture: ComponentFixture<PreguntaMultipleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PreguntaMultipleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PreguntaMultipleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
