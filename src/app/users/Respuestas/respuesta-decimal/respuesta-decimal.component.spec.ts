import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RespuestaDecimalComponent } from './respuesta-decimal.component';

describe('RespuestaDecimalComponent', () => {
  let component: RespuestaDecimalComponent;
  let fixture: ComponentFixture<RespuestaDecimalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RespuestaDecimalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RespuestaDecimalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
