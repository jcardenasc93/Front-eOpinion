import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PreguntaSimpleComponent } from './pregunta-simple.component';

describe('PreguntaSimpleComponent', () => {
  let component: PreguntaSimpleComponent;
  let fixture: ComponentFixture<PreguntaSimpleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PreguntaSimpleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PreguntaSimpleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
