import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RespuestaAbiertaComponent } from './respuesta-abierta.component';

describe('RespuestaAbiertaComponent', () => {
  let component: RespuestaAbiertaComponent;
  let fixture: ComponentFixture<RespuestaAbiertaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RespuestaAbiertaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RespuestaAbiertaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
