import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PreguntaAbiertaNumeroComponent } from './pregunta-abierta-numero.component';

describe('PreguntaAbiertaNumeroComponent', () => {
  let component: PreguntaAbiertaNumeroComponent;
  let fixture: ComponentFixture<PreguntaAbiertaNumeroComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PreguntaAbiertaNumeroComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PreguntaAbiertaNumeroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
