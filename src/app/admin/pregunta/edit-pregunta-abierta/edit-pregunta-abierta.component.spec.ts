import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditPreguntaAbiertaComponent } from './edit-pregunta-abierta.component';

describe('EditPreguntaAbiertaComponent', () => {
  let component: EditPreguntaAbiertaComponent;
  let fixture: ComponentFixture<EditPreguntaAbiertaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditPreguntaAbiertaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditPreguntaAbiertaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
