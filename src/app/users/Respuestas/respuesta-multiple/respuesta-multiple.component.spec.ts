import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RespuestaMultipleComponent } from './respuesta-multiple.component';

describe('RespuestaMultipleComponent', () => {
  let component: RespuestaMultipleComponent;
  let fixture: ComponentFixture<RespuestaMultipleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RespuestaMultipleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RespuestaMultipleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
