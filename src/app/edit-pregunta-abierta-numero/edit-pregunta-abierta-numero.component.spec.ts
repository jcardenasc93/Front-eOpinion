import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditPreguntaAbiertaNumeroComponent } from './edit-pregunta-abierta-numero.component';

describe('EditPreguntaAbiertaNumeroComponent', () => {
  let component: EditPreguntaAbiertaNumeroComponent;
  let fixture: ComponentFixture<EditPreguntaAbiertaNumeroComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditPreguntaAbiertaNumeroComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditPreguntaAbiertaNumeroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
